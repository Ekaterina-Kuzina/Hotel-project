import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider, connect } from "react-redux";
import store from "./services/store";
import App from "./components/app/app";

const ConnectedApp = connect((state) => {
  return state;
})(App);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
