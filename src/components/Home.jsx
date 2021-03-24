import React, { useEffect, useState } from "react";
import config from "../config.json";
import BotCard from "./BotCard";
import _ from "underscore";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { errorNotificationAddAction, get, useNotificationContext } from "../helpers";
import Conditional from "./utils/Conditional";
import Spinner from "./Spinner";
import Lazy from "./utils/Lazy";


function CreateBotButton(_props) {
    const history = useHistory();

    const handleOnClick = () => {
        history.push("/bots/new");
    }

    return <Button variant="secondary" onClick={handleOnClick}>New bot</Button>;
}

const Home = (props) => {
    const [bots, setBots] = useState([]);
    const notificationDispatch = useNotificationContext();

    useEffect(() => {
        const getBots = () => {
            const params = { token: props.getToken() }
    
            const onError = (error) => {
                props.deleteToken();
                notificationDispatch(errorNotificationAddAction(error));
            }

            get(`${config.api_host}/bots`, params, (bots) => { setBots(bots); }, onError);
        }

        getBots();
        const interval = setInterval(() => {
            getBots();
        }, 10 * 1000);

        return () => { clearInterval(interval); };
    }, [props, notificationDispatch]);


    const botCardRows = () => {
        return _.chunk(bots, 3).map((botChunk, deckIndex) => {
            const cards = botChunk.map((bot, index) => {
                return <BotCard key={index} botInfo={bot}/>;
            });

            return <CardDeck style={{margin: "1% 1% 1% 1%"}} key={deckIndex}>{cards}</CardDeck>;
        });
    } 

    return (
        <React.Fragment>
        <h1>Bots</h1>
        <div style={{marginTop: "5%"}}>
            <CreateBotButton/>
            <br/>
            <Conditional condition={() => bots.length > 0} primary={<Lazy component={botCardRows}/>} secondary={<Spinner/>}/>
        </div>
    </React.Fragment> 
    );
}
 
export default Home;
