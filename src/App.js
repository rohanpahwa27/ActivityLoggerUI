import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Signup/Signup.js";

function App() {
  return (
    <Router>
      <Route path="/Signup" component={Signup} />
    </Router>
  );
}

export default App;
