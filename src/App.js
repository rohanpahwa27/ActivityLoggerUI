import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login/Login.js";
import Signup from "./Signup/Signup.js";

function App() {
  return (
    <Router>
      <Route path="/Signup" component={Signup} />
    </Router>
  );
}

export default App;
