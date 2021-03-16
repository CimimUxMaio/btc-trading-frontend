import React, { Component } from "react";
import { get } from "../helpers";
import config from "../config.json";
import Conditional from "./utils/Conditional";
import { withRouter } from "react-router";
import Spinner from "./Spinner";


function BotInfo(props) {
    return <p>{JSON.stringify(props.botInfo)}</p>;
}

class BotDetails extends Component {
    state = {
        botInfo: null
    }

    getBotInfo() {
        const botId = this.props.match.params.botId;
        const { getToken, deleteToken } = this.props;
        const onSuccess = (responseData) => {
            this.setState({ botInfo: responseData });
        }
        const onError = (_error) => {
            deleteToken();
        }

        get(config.api_host+"/bots/"+botId, { token: getToken() }, onSuccess, onError);
    }

    componentDidMount() {
        this.getBotInfo();
        this.interval = setInterval(() => { this.getBotInfo() }, 10 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() { 
        return (
            <React.Fragment>
                <h1>Bot</h1>
                <Conditional condition={() => this.state.botInfo} primary={<BotInfo botInfo={this.state.botInfo}/>} secondary={<Spinner/>}/>
            </React.Fragment>
        );
    }
}
 
export default withRouter(BotDetails);