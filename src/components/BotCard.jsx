import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";
import { delete_, useNotificationContext, notificationAddAction, errorNotificationAddAction } from "../helpers.js";
import config from "../config.json";
import {NotificationType} from "./notifications/Notification.jsx";

const BotCard = (props) => {
    const { id, strategy } = props.botInfo;
    const { stage, status } = strategy;
    const profit = status.profit;
    const notificationDispatch = useNotificationContext();

    const bgColor = (stage === "RUNNING")? "success" : (stage === "TERMINATED") ? "danger" : "info";

    const onSuccess = (_responseData) => {
        notificationDispatch(notificationAddAction(NotificationType.Success, "Bot deleted successfully"));
    }

    const onError = (error) => {
        notificationDispatch(errorNotificationAddAction(error));
    }

    const deleteBot = () => {
        delete_(`${config.api_host}/bots/${id}`, { token: props.getToken() }, onSuccess, onError); 
    }

    return (
        <Card bg={bgColor}>
            <Card.Header>
                {id}
                <Button onClick={deleteBot} className="close">X</Button>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Profit: { profit }
                </Card.Text>
                <Button variant="outline-dark" onClick={() => props.history.push("/bots/"+id)}>Details</Button>
            </Card.Body>
        </Card>
    );
}
 
export default withRouter(BotCard);
