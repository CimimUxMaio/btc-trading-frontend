import React, { useEffect, useState } from "react";
import { errorNotificationAddAction, get, notificationAddAction, useNotificationContext, put } from "../helpers";
import config from "../config.json";
import Conditional from "./utils/Conditional";
import Spinner from "./Spinner";
import BotInfo from "./BotInfo";
import { useParams } from "react-router";
import {Button} from "react-bootstrap";
import {NotificationType} from "./notifications/Notification";


const BotDetails = (props) => {
    const [botInfo, setBotInfo] = useState(null);
    const params = useParams();
    const botId = params.botId;
    const notificationDispatch = useNotificationContext();

    useEffect(() => {
        const getBotInfo = () => {
            const { getToken, deleteToken } = props;
            get(`${config.api_host}/bots/${botId}`, { token: getToken() }, (responseData) => { setBotInfo(responseData) }, (error) => { deleteToken(); notificationAddAction(errorNotificationAddAction(error)) });
        }

        getBotInfo();
        const interval = setInterval(() => {
            getBotInfo();
        }, 10 * 1000)

        return () => { clearInterval(interval) };
    }, [props, botId, notificationDispatch]);

    const stopBot = () => {
        const onSuccess = (_requestData) => { notificationDispatch(notificationAddAction(NotificationType.Success, "Bot stopped")) };
        const onError = (error) => { notificationDispatch(errorNotificationAddAction(error)) };

        put(`${config.api_host}/bots/${botId}`, { token: props.getToken() }, {}, onSuccess, onError);    
    }

    return (
        <React.Fragment>
            <h1>Bot {botId}</h1>
            <Button variant="danger" onClick={stopBot}>Stop</Button>
            <Conditional condition={() => botInfo} primary={<BotInfo botInfo={botInfo}/>} secondary={<Spinner/>}/>
        </React.Fragment>
    );
}
 
export default BotDetails;
