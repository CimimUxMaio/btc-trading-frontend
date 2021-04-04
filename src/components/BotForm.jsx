import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { get, post, camelToSentence, useNotificationContext, errorNotificationAddAction, notificationAddAction } from "../helpers";
import config from "../config.json";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import { NotificationType } from "./notifications/Notification";


const BotForm = (props) => {
    const [exchange, setExchange] = useState(null);
    const [exchangeNames, setExchangeNames] = useState([]);
    const [inversion, setInversion] = useState(0);
    const [range, setRange] = useState(50);
    const [levels, setLevels] = useState(15);
    const [startingPrice, setStartingPrice] = useState("");
    const [botName, setBotName] = useState("");
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentConfigComponents, setCurrentConfigComponents] = useState([]);
    const notificationDispatch = useNotificationContext();
    const history = useHistory();

    const handleChange = setter => {
        return (event) => setter(event.target.value);
    }

    useEffect(() => {
        const onError = (error) => {
            notificationDispatch(errorNotificationAddAction(error));
        }

        const onSuccess = (responseData) => {
            setExchangeNames(responseData);
            if(responseData.length > 0)
                setExchange(responseData[0]);
        }

        get(`${config.api_host}/exchanges`, {}, onSuccess, onError);
    }, []);
    
    useEffect(() => {
        const calculateConfig = () => {
            const trueStartingPrice = (startingPrice.length > 0) ? parseFloat(startingPrice) : currentPrice;
            const upperBound = trueStartingPrice * (1 + range/100);
            const lowerBound = trueStartingPrice * (1 - range/100);
            const levelHeight = (upperBound - trueStartingPrice) / levels;
            const tao = Math.pow(1 - 0.001, 2);
            const bestProfit = (((lowerBound + levelHeight) * tao / lowerBound) - 1) * 100;
            const worstProfit = ((upperBound * tao / (upperBound - levelHeight)) - 1) * 100;
    
            return { upperBound: upperBound, lowerBound: lowerBound, levelHeight: levelHeight, bestProfit: bestProfit, worstProfit: worstProfit };
        }

        const makeComponents = (config) => {
            return Object.keys(config).map((key, index) => {
                return (
                    <p key={index} style={{textAlign:"left", color: "gray"}}><b>{camelToSentence(key)}:</b> {config[key]}</p>
                );
            })
        }

        setCurrentConfigComponents(makeComponents(calculateConfig()));
    }, [range, levels, startingPrice, currentPrice])


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            inversion: inversion,
            range: range,
            levels: levels
        };

        if (startingPrice.length > 0) {
            data["startingPrice"] = startingPrice;
        }

        if(botName.length > 0) {
            data["name"] = botName;
        }

        const onSuccess = (_responseData) => {
            history.push("/"); 
            notificationDispatch(notificationAddAction(NotificationType.Success, "Bot created successfuly!"));
        }

        const onError = (error) => {
            notificationDispatch(errorNotificationAddAction(error));
        }

        post(config.api_host + "/bots", {}, data, onSuccess, onError);
    }


    useEffect(() => {
        if(!exchange) return;

        var isMounted = true;

        const requestCurrentPrice = () => {
            const onSuccess = (responseData) => {
               if(isMounted) {
                   const currentPrice = parseFloat(responseData.price);
                   setCurrentPrice(currentPrice);
               }
            }

            const onError = (error) => {
                notificationDispatch(errorNotificationAddAction(error));
            }

            get(`${config.api_host}/price/${exchange}`, {}, onSuccess, onError);
        }

        requestCurrentPrice();
        const interval = setInterval(() => {requestCurrentPrice()}, 10 * 1000);
        return () => { clearInterval(interval); isMounted = false; };
    }, [props, notificationDispatch, exchange]);

    return (
        <Card className="bg-light text-white" style={{width: "45%", margin: "auto", marginTop: "2%"}}>
            <Card.Header>
                { currentConfigComponents }
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className="text-dark">Exchange</Form.Label>
                        <Form.Control as="select" onChange={handleChange(setExchange)}>
                            { exchangeNames.map(name => <option value={name}>{name}</option>) }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-dark">Amount to invest</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>USDT</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control required type="number" onChange={handleChange(setInversion)} placeholder={inversion}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-dark">Range</Form.Label>
                        <Form.Control type="range" min="1" max="100" step="0.25" onChange={handleChange(setRange)}/>
                        <Form.Text className="text-dark">{range}</Form.Text>
                        <Form.Text className="text-muted">% between starting price and it's lower and upper boundaries.</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-dark">Levels</Form.Label>
                        <Form.Control type="range" min="2" max="30" step="1" onChange={handleChange(setLevels)}/>
                        <Form.Text className="text-dark">{levels}</Form.Text>
                        <Form.Text className="text-muted">Levels between the starting level and it's boundaries.</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-dark">Starting price</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>USDT</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" placeholder={currentPrice} onChange={handleChange(setStartingPrice)}/>
                        </InputGroup>
                        <Form.Text className="text-muted">(Optional) defaults to the current market price.</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="text-dark">Bot name</Form.Label>
                        <Form.Control type="text" placeholder="Bot name" onChange={handleChange(setBotName)}/>
                        <Form.Text className="text-muted">(Optional) defaults to a generated id</Form.Text>
                    </Form.Group>

                    <Button variant="secondary" type="submit">
                        Create
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
 
export default BotForm;
