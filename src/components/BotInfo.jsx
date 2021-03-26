import React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { camelToSentence, put, errorNotificationAddAction, notificationAddAction, useNotificationContext } from "../helpers";
import {Button} from "react-bootstrap";
import {NotificationType} from "./notifications/Notification";
import config from "../config.json";


function InlineValueLabel({label, value}) {
    return <span style={{margin: "0% 1% 0% 1%"}}><b>{label}:</b> {value}</span>
}

function Section({title, children}) {
    return (
        <Card style={{margin: "2% 20% 2% 20%"}}>
            <Card.Header><b>{title}</b></Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
        </Card>
    );
}

function Status({btc, usdt, profit, balance}) {
    return (
        <Section title="Status">
            <InlineValueLabel label="BTC" value={btc}/>
            <InlineValueLabel label="USDT" value={usdt}/>
            <InlineValueLabel label="Profit" value={profit}/>
            <InlineValueLabel label="Current balance" value={balance}/>
        </Section>
    );
}

function History({ logs }) {
    const tableRegisters = logs.map((log, index) => {
        const profitGainSign = (log.profitGain > 0) ? "+" : (log.profitGain === 0) ? "" : "-";
        const profitGainColor = (profitGainSign === "+") ? "green" : (profitGainSign === "-") ? "red" : "black";
        return (
            <tr key={index}>
                <td>{log.time}</td>
                <td>{log.event}</td>
                <td>{log.marketPrice}</td>
                <td style={{color: profitGainColor}}>{profitGainSign + " " + Math.abs(log.profitGain)}</td>
            </tr>
        );
    });

    return (
        <Section title="History">
            <Table hover size="sm">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Event</th>
                        <th>Market price</th>
                        <th>Profit gain</th>
                    </tr>
                </thead> 
                <tbody>
                    { tableRegisters }
                </tbody>   
            </Table>
        </Section>
    );
}

function Configuration({ object }) {
    return (
        <Section title="Configuration">
            {
                Object.keys(object).map((key, index) => {
                    return <p key={index} style={{textAlign:"left"}}><b>{camelToSentence(key)}:</b> {object[key]}</p>
                })
            }
        </Section>
    );
}


function BotInfo(props) {
    const { id, name, strategy } = props.botInfo;
    const { configuration, status, logs } = strategy;
    const notificationDispatch = useNotificationContext();

    const stopBot = () => {
        const onSuccess = (_requestData) => { notificationDispatch(notificationAddAction(NotificationType.Success, "Bot stopped")) };
        const onError = (error) => { notificationDispatch(errorNotificationAddAction(error)) };

        put(`${config.api_host}/bots/${id}`, { token: props.getToken() }, {}, onSuccess, onError);    
    }

    return (
        <React.Fragment>
            <h1>{name}</h1>
            <Button variant="danger" onClick={stopBot}>Stop</Button>
            <Status {...status}/>
            <History logs={logs}/>
            <Configuration object={configuration}/>
        </React.Fragment>
    );
}

export default BotInfo;
