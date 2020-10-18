import React, { Component } from "react";
import "./Signup.css";
import SignupHeader from "./SignupHeader/SignupHeader.js";
import SignupCard from "./SignupCard/Signup.js";

export default class Signup extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <SignupHeader />
        <SignupCard />
      </div>
    );
  }
}

