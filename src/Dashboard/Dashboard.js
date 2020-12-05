import React, { Component } from "react";
import "./Dashboard.css";
import ApplicationCard from "./ApplicationCard/ApplicationCard.js";
import { Row, Col } from "react-bootstrap";
import Header from "../GlobalComponents/LoggedInHeader";
import { Route, Switch } from "react-router";
import LogView from "../LogView/LogView.js";
import PinnedLogs from "../PinnedLogs/PinnedLogs.js";

export default class Dashboard extends Component {
  render() {
    document.body.style = "background: white !important;";
    return (
      <Switch>
        <Route exact path="/dashboard/:application" component={LogView} />
        <Route
          exact
          path="/dashboard/:application/pinned"
          component={PinnedLogs}
        />
        <Route>
          <div className="justify-content-center">
            <Header />
            <Row
              style={{
                paddingTop: 50,
              }}
            >
              <ApplicationCard
                application="My Website"
                type="Frontend"
                link="frontend-website"
              />
              <ApplicationCard
                application="Java Main Web Service"
                type="Backend"
                link="java-backend"
              />
              <ApplicationCard
                application="Items Database"
                type="Mongo Database"
                link="mongo-db"
              />
            </Row>
          </div>
        </Route>
      </Switch>
    );
  }
}
