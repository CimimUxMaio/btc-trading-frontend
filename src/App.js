import React from "react";
import './App.css';
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import BotCreation from "./components/BotCreation";
import BotDetails from "./components/BotDetails";

const App = (props) => {
    return (
        <HashRouter>
            <div className="App">
                <Navbar/>
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home notificationRaiser={props.notificationRaiser}/>
                        </Route>

                        <Route path="/bots/new">
                            <BotCreation />
                        </Route>

                        <Route path="/bots/:botId">
                            <BotDetails />
                        </Route>
                    </Switch>
                </div>
            </div>
        </HashRouter>
    );
}
        
export default App;
