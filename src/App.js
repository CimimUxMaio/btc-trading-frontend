import React, { Component } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import LoggedInRoute from "./components/LoggedInRoute";
import SignIn from "./components/SignIn";

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

              <LoggedInRoute
                exact
                path="/"
                isLoggedIn={this.tokenExists}
                getToken={this.getToken}
                deleteToken={this.deleteToken}
                componentType={Home}/>

              <LoggedInRoute 
                path="/bots/:bot_id" 
                componentType={(<h1>Bot</h1>).type} 
                isLoggedIn={this.tokenExists}
                getToken={this.getToken}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
