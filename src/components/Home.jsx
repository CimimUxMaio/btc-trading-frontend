import React, { Component } from "react";
import Axios from "axios";
import config from "../config.json";
import Card from "react-bootstrap/Card";


class Home extends Component {
    userBots() {
        let bots = [];
        Axios.get(config.api_host + "/bots", { params: { token: this.props.getToken() }}).then(response => {
            bots = response.data;
        }).catch(error => {
            error.response? alert(error.data) : alert(error);
        });

        return bots;
    }

    render() {
        return (
            <React.Fragment>
                <h1>Bots</h1>
                {this.userBots().map(bot => <Card><Card.Title>{bot.name}</Card.Title></Card>)}
            </React.Fragment>
        )
    }
}

export default Home;