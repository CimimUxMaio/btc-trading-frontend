import { Route, Redirect } from "react-router-dom";
import React from "react";
import Conditional from "./utils/Conditional";

function ConditionalRoute({checkCondition, children, ...restoOfProps}) {
    return (
    <Route {...restoOfProps}>
        <Conditional condition={checkCondition} primary={children} secondary={<Redirect to="/sign-in"/>}/>
    </Route>
    );
}
 
export default ConditionalRoute;