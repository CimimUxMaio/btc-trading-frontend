import React from "react";
import Card from "react-bootstrap/Card";
import { camelToSentence } from "../helpers";


const BotCard = (props) => {
    const { id, strategy } = props.botInfo;
    const {inversion, upperBound, lowerBound, startingPrice } = strategy.configuration;
    const status = strategy.status;

    const importantAttributes = {
        inversion: inversion,
        upperBound: upperBound,
        lowerBound: lowerBound,
        startingPrice: startingPrice,
        ...status
    }

    const configComponents = Object.keys(importantAttributes).map((key, index) => {
        return <p key={index} style={{textAlign:"left"}}><b>{camelToSentence(key)}:</b> {importantAttributes[key]}</p>
    });

    return (
        <Card bg="light">
            <Card.Header>{id}</Card.Header>
            <Card.Body>
                { configComponents }
            </Card.Body>
        </Card>
    );
}
 
export default BotCard;