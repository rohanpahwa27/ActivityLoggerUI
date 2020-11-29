import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Signup/Signup.js";
import Login from "./Login/Login.js";
import Team from "./Team/Team.js";
import Dashboard from "./Dashboard/Dashboard.js";
import { UserContext } from "./Context/UserContext.js";

class App extends Component {
  constructor(props) {
    super(props);
    var userObj = null;
    if (localStorage.getItem("email") !== null) {
      userObj = {
        email: localStorage.getItem("email"),
        isAdmin: localStorage.getItem("isAdmin"),
      };
    }
    this.state = {
      userObj: userObj,
    };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(userObj) {
    this.setState({
      userObj: userObj,
    });
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          userObj: this.state.userObj,
          updateUser: this.updateUser,
        }}
      >
        <Router>
          <Route path="/signup" component={Signup} />
          <Route path="/team" component={Team} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Login} />
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
