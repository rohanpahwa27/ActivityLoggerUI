import React, { Component } from "react";
import "./LogItem.css";

export default class LogItem extends Component {
  render() {
    return <div>{this.props.log}</div>;
  }
}
