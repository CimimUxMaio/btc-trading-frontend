import React, { Component } from "react";
import config from "../config.json";
import BotCard from "./BotCard";
import _ from "underscore";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { get } from "../helpers";


function CreateBotButton(props) {
    const history = useHistory();

    const handleOnClick = () => {
        history.push("/bots/new");
    }

    return <Button onClick={handleOnClick}>New bot</Button>;
}

class Home extends Component {
    state = {
        bots: []
    }

    getBots() {
        const params = { token: this.props.getToken() };
        function onSuccess(bots) { this.setState({bots}) }
        function onError(_error) { this.props.deleteToken() };
        get(config.api_host + "/bots", params, onSuccess.bind(this), onError.bind(this));
    }

    componentDidMount() {
        this.getBots();
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
                <span>
                    <h1>Bots</h1>
                    <CreateBotButton/>
                </span>
                <div style={{marginTop: "5%"}}>
                    {this.botCardRows()}
                </div>
            </React.Fragment>
        );
    }
}

export default Home;