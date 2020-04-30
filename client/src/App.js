/** @format */

import React, { Component } from "react";
import MithubMain from "./components/MithubMain";
import { withRouter, Switch, Route } from "react-router-dom";
import AutoCallBack from "./components/AutoCallBack.js";

@withRouter
class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={MithubMain} />
        <Route path='/auth/github/callback' component={AutoCallBack} />
      </Switch>
    );
  }
}

export default App;
