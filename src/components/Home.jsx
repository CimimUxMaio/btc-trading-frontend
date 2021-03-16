import React, { Component } from "react";
import config from "../config.json";
import BotCard from "./BotCard";
import _ from "underscore";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { get } from "../helpers";
import Conditional from "./utils/Conditional";
import Spinner from "./Spinner";
import Lazy from "./utils/Lazy";


function CreateBotButton(props) {
    const history = useHistory();

    const handleOnClick = () => {
        history.push("/bots/new");
    }

    return <Button variant="secondary" onClick={handleOnClick}>New bot</Button>;
}

class Home extends Component {
    state = {
        bots: null
    }

    getBots() {
        const params = { token: this.props.getToken() };
        function onSuccess(bots) { this.setState({bots}) }
        function onError(_error) { this.props.deleteToken() };
        get(config.api_host + "/bots", params, onSuccess.bind(this), onError.bind(this));
    }

    componentDidMount() {
        this.getBots();
        this.interval = setInterval(() => { this.getBots() }, 10 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    botCardRows() {
        return _.chunk(this.state.bots, 3).map((botChunk, deckIndex) => {
            const cards = botChunk.map((bot, index) => {
                return <BotCard key={index} botInfo={bot}/>;
            });

            return <CardDeck style={{margin: "1% 1% 1% 1%"}} key={deckIndex}>{cards}</CardDeck>;
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Bots</h1>
                <div style={{marginTop: "5%"}}>
                    <CreateBotButton/>
                    <br/>
                    <Conditional condition={() => this.state.bots} primary={<Lazy component={this.botCardRows.bind(this)}/>} secondary={<Spinner/>}/>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;