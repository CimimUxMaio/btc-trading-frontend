import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { get, post, camelToSentence } from "../helpers";
import config from "../config.json";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";


class BotForm extends Component {
    state = {
        inversion: 0,
        range: 50,
        levels: 5,
        startingPrice: 0,
        currentPrice: 0
    }

    handleChange(fieldName, event) {
        let newState = {...this.state};
        newState[fieldName] = event.target.value;        
        this.setState(newState);
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        const { inversion, range, levels, startingPrice } = this.state;
        const data = {
            inversion: inversion,
            range: range,
            levels: levels
        };

        if (this.startingPriceIsSet()) {
            data["startingPrice"] = startingPrice;
        }

        const onSuccess = (_responseData) => {
            this.props.history.push("/");
        }

        post(config.api_host + "/bots", { token: this.props.getToken() }, data, onSuccess);
    }

    startingPriceIsSet() {
        return this.state.startingPrice.length > 0;
    }

    requestCurrentPrice() {
        function onSuccess(responseData) {
            const currentPrice = parseFloat(responseData.price);
            this.setState({currentPrice});
        }

        get(config.api_host + "/price", null, onSuccess.bind(this));
    }

    currentConfig() {
        const { startingPrice: inputStartingPrice, currentPrice, range, levels } = this.state;
        const startingPrice = (inputStartingPrice.length > 0) ? parseFloat(inputStartingPrice) : currentPrice;
        const upperBound = startingPrice * (1 + range/100);
        const lowerBound = startingPrice * (1 - range/100);
        const levelHeight = (upperBound - startingPrice) / levels;
        const tao = Math.pow(1 - 0.001, 2);
        const bestProfit = (((lowerBound + levelHeight) * tao / lowerBound) - 1) * 100;
        const worstProfit = ((upperBound * tao / (upperBound - levelHeight)) - 1) * 100;

        return { upperBound: upperBound, lowerBound: lowerBound, levelHeight: levelHeight, bestProfit: bestProfit, worstProfit: worstProfit };
    }

    currentConfigurationComponents() {
        const currentConfig = this.currentConfig();
        return Object.keys(currentConfig).map((key, index) => {
            return (
                <p key={index} style={{textAlign:"left", color: "gray"}}><b>{camelToSentence(key)}:</b> {currentConfig[key]}</p>
            );
        })
    }

    componentDidMount() {
        this.requestCurrentPrice();
        this.interval = setInterval(() => { this.requestCurrentPrice() }, 20 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Card className="bg-light text-white" style={{width: "45%", margin: "auto", marginTop: "2%"}}>
                <Card.Header>
                    { this.currentConfigurationComponents() }
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleOnSubmit}>
                        <Form.Group>
                            <Form.Label className="text-dark">Amount to invest</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>USDT</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control required type="number" onChange={this.handleChange.bind(this, "inversion")} placeholder={this.state.inversion}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-dark">Range</Form.Label>
                            <Form.Control type="range" min="1" max="100" step="0.25" onChange={this.handleChange.bind(this, "range")}/>
                            <Form.Text className="text-dark">{this.state.range}</Form.Text>
                            <Form.Text className="text-muted">% between starting price and it's lower and upper boundaries.</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-dark">Levels</Form.Label>
                            <Form.Control type="range" min="2" max="30" step="1" onChange={this.handleChange.bind(this, "levels")}/>
                            <Form.Text className="text-dark">{this.state.levels}</Form.Text>
                            <Form.Text className="text-muted">Levels between the starting level and it's boundaries.</Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-dark">Starting price</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>USDT</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="number" placeholder={this.state.currentPrice} onChange={this.handleChange.bind(this, "startingPrice")}/>
                            </InputGroup>
                            <Form.Text className="text-muted">(Optional) defaults to the current market price.</Form.Text>
                        </Form.Group>

                        <Button variant="secondary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}


export default withRouter(BotForm);