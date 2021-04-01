import React, { useEffect, useState } from "react";
import { errorNotificationAddAction, get, notificationAddAction, useNotificationContext } from "../helpers";
import config from "../config.json";
import Conditional from "./utils/Conditional";
import Spinner from "./Spinner";
import BotInfo from "./BotInfo";
import { useParams } from "react-router";

const BotDetails = (props) => {
    const [botInfo, setBotInfo] = useState(null);
    const params = useParams();
    const botId = params.botId;
    const notificationDispatch = useNotificationContext();

    useEffect(() => {
        const getBotInfo = () => {
            get(`${config.api_host}/bots/${botId}`, {}, (responseData) => { setBotInfo(responseData) }, (error) => { notificationAddAction(errorNotificationAddAction(error)) });
        }

        getBotInfo();
        const interval = setInterval(() => {
            getBotInfo();
        }, 10 * 1000)

        return () => { clearInterval(interval) };
    }, [props, botId, notificationDispatch]);


    return (
        <React.Fragment>
            <Conditional condition={() => botInfo} primary={<BotInfo botInfo={botInfo}/>} secondary={<Spinner/>}/>
        </React.Fragment>
    );
}
 
export default BotDetails;
