import React, { Component } from "react";
import "./Login.css";
import LoginHeader from "./LoginHeader/LoginHeader.js";
import LoginCard from "./LoginCard/LoginCard.js";

export default class Login extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <LoginHeader />
        <LoginCard />
      </div>
    );
  }
}
