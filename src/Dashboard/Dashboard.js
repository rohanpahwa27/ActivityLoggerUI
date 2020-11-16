import React, { Component } from "react";
import "./Dashboard.css";
import ApplicationCard from "./ApplicationCard/ApplicationCard.js";
import { Row, Col } from "react-bootstrap";
import Header from "../GlobalComponents/LoggedInHeader";

export default class Dashboard extends Component {
  render() {
    document.body.style = "background: white !important;";
    return (
      <div className="justify-content-center">
      <Header/>
        <Row style={{
          paddingTop: 50
        }}>
          <ApplicationCard application="My Website" type="Frontend"/>
          <ApplicationCard application="Java Main Web Service" type="Backend"/>
          <ApplicationCard application="Items Database" type="Mongo Database"/>
        </Row>
      </div>
    );
  }
}
