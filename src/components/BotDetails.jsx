import React, { useEffect, useState } from "react";
import { get } from "../helpers";
import config from "../config.json";
import Conditional from "./utils/Conditional";
import Spinner from "./Spinner";
import BotInfo from "./BotInfo";
import { useParams } from "react-router";
import { errorMessage } from "../helpers";


const BotDetails = (props) => {
    const [botInfo, setBotInfo] = useState(null);
    const params = useParams();
    const botId = params.botId;

    useEffect(() => {
        const getBotInfo = () => {
            const { getToken, deleteToken } = props;
            get(`${config.api_host}/bots/${botId}`, { token: getToken() }, (responseData) => { setBotInfo(responseData) }, (error) => { deleteToken(); console.log(errorMessage(error)); });
        }

        getBotInfo();
        const interval = setInterval(() => {
            getBotInfo();
        }, 10 * 1000)

        return () => { clearInterval(interval) };
    }, [props, botId]);

    return (
        <React.Fragment>
            <h1>Bot {botId}</h1>
            <Conditional condition={() => botInfo} primary={<BotInfo botInfo={botInfo}/>} secondary={<Spinner/>}/>
        </React.Fragment>
    );
}
 
export default BotDetails;