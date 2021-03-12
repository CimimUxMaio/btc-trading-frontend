import React from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>

            <Route exact path="/">
              <Home/>
            </Route>

            <Route path="/test">
              <h1>TEST ROUTE</h1>
            </Route>

          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
