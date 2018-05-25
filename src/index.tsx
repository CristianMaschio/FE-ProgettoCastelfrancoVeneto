import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Header from "./components/Header/Header";

ReactDOM.render(
  <div>
    <Header />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>,
  document.getElementById("root") as HTMLElement
);
