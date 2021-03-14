import React, { Component } from "react";
import Axios from "axios";
import config from "../config.json";
import BotCard from "./BotCard";
import _ from "underscore";
import CardDeck from "react-bootstrap/CardDeck";


class Home extends Component {
    state = {
        bots: []
    }

    getBots() {
        Axios.get(config.api_host + "/bots", { params: { token: this.props.getToken() }}).then(response => {
            const bots = response.data
            this.setState({bots});
        }).catch(error => {
            this.props.deleteToken();
            if (error.response) {
                // Request made and server responded
                alert(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                alert(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                alert('Error', error.message);
            }
        });
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
                <h1>Bots</h1>
                <div style={{marginTop: "5%"}}>
                    {this.botCardRows()}
                </div>
            </React.Fragment>
        );
    }
}

export default Home;