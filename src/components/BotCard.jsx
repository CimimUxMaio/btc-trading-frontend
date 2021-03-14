import React from "react";
import Card from "react-bootstrap/Card";


const BotCard = (props) => {
    return (
        <Card style={{ margin: "1% 1% 1% 1%" }} bg="light">
            <Card.Header>{props.botInfo.id}</Card.Header>
            <div style={{ margin: "3% 3% 3% 3%" }}>
                <Card.Text>{JSON.stringify(props.botInfo.strategy.configuration)}</Card.Text>
            </div>
        </Card>
    );
}
 
export default BotCard;