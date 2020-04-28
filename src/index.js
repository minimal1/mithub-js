/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <Provider>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
