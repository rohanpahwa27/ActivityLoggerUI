import React, { Component } from "react";
import "./ApplicationCard.css";
import { Form, Button, Container, Row, Col, Collapse } from "react-bootstrap";
import api from "../../Api/api.js";
import { withRouter } from "react-router-dom";

class ApplicationCard extends Component {
  constructor(props) {
    super(props);
    this.state = { invalidCredentials: false };
  }

  async handleLogin(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    const response = await api.loginUser({
      email: email,
      password: password,
    });

    if (response.data.status === "error") {
      this.setState({
        invalidCredentials: true,
      });
    }
  }

  render() {
    return (
      <Container className="application-container col-4">
        <Row className="justify-content-center">
          <div className="application-card">
            <div>
              <h2>{this.props.application}</h2>
              <p>Type: {this.props.type}</p>
              <p>Reporting: true</p>
              <Button
                className="viewLogs float-right"
                onClick={() => {
                  this.props.history.push("/dashboard/" + this.props.link);
                }}
              >
                View Logs
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ApplicationCard);
