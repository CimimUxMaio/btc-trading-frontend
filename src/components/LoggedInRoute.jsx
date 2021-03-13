import { Route, Redirect } from "react-router-dom";

function LoggedInRoute({isLoggedIn, componentType: Component, ...restoOfProps}) {
    return <Route {...restoOfProps} render={props => isLoggedIn()? <Component {...props} {...restoOfProps}/> : <Redirect to="/sign-in"/>}/>;
}
 
export default LoggedInRoute;