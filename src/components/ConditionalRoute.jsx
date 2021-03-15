import { Route, Redirect } from "react-router-dom";

function ConditionalRoute({checkCondition, children, ...restoOfProps}) {
    return <Route {...restoOfProps}>{() => checkCondition()? children : <Redirect to="/sign-in"/>}</Route>;
}
 
export default ConditionalRoute;