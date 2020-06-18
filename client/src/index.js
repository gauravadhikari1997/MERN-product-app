import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./index.css";

import App from "./App";
import Product from "./Product";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/product/:id">
        <Product />
      </Route>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);
