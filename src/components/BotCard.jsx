import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";


const BotCard = (props) => {
    const { id, strategy } = props.botInfo;
    const { stage, status } = strategy;
    const profit = status.profit;

    const bgColor = (stage === "RUNNING")? "success" : (stage === "TERMINATED") ? "danger" : "info";

    return (
        <Card bg={bgColor}>
            <Card.Header>{id}</Card.Header>
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
