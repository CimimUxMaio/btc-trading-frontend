import React, { Component } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import SignIn from "./components/SignIn";
import ConditionalRoute from "./components/ConditionalRoute";
import BotCreation from "./components/BotCreation";
import BotDetails from "./components/BotDetails";

class App extends Component {
  state = {}

  forceRender = () => {
    this.setState({});
  }

  setToken = (token) => {
    localStorage.setItem("token", token);
    this.forceRender();
  }

  deleteToken = () => {
    localStorage.removeItem("token");
    this.forceRender();
  }

  getToken = () => {
    return localStorage.getItem("token");
  }

  tokenExists = () => {
    return !!this.getToken();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar 
            isLoggedIn={this.tokenExists} 
            setToken={this.setToken}
            deleteToken={this.deleteToken}/>
          <div className="content">
            <Switch>
              <Route path="/sign-in">
                <SignIn/>
              </Route>

              <Route path="/test">
                <h1>TEST ROUTE</h1>
              </Route>

              <ConditionalRoute exact path="/" checkCondition={this.tokenExists}>
                <Home getToken={this.getToken} deleteToken={this.deleteToken}/>
              </ConditionalRoute>

              <ConditionalRoute path="/bots/new" checkCondition={this.tokenExists}>
                <BotCreation getToken={this.getToken} deleteToken={this.deleteToken}/>
              </ConditionalRoute>

              <ConditionalRoute path="/bots/:botId" checkCondition={this.tokenExists}>
                <BotDetails getToken={this.getToken} deleteToken={this.deleteToken}/>
              </ConditionalRoute>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
