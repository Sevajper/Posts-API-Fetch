import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainAppWithRoutes from "./components/MainAppWithRoutes";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainAppWithRoutes />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
