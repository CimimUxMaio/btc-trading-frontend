import React from "react";
import BotForm from "./BotForm";


const BotCreation = (props) => {
    return ( 
        <React.Fragment>
            <h1>Create new bot</h1>
            <BotForm {...props}/>
        </React.Fragment>
    );
}
 
export default BotCreation;