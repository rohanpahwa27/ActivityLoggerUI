import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Signup/Signup.js";
import Login from "./Login/Login.js";

function App() {
  return (
    <Router>
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Login} />
    </Router>
  );
}

export default App;
