import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./SignupHeader.css";

export default class SignupHeader extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Brand className="pl-1 pl-md-4 brand">
          Activity Logger
        </Navbar.Brand>
      </Navbar>
    );
  }
}
