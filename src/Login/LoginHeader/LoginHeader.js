import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./LoginHeader.css";

export default class LoginHeader extends Component {
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
