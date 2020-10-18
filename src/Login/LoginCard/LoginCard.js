import React, { Component } from "react";
import "./LoginCard.css";
import api from "../../Api/api.js";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default class LoginCard extends Component {
  async handleLogin(event) {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;

    const response = await api.insertUser({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      admin: false,
    });

    alert(response);
  }

  render() {
    return (
      <Container className="login-container">
        <Row>
          <Col
            sm={{ span: 12 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
          >
            <div>
              <p className="welcome-text">Welcome!</p>
            </div>
            <div className="d-flex flex-column login-card p-3 p-lg-5">
              <div>
                <Form onSubmit={(e) => this.handleLogin(e)}>
                  <Form.Group controlId="firstName">
                    <Form.Control
                      type="text"
                      className="login-input"
                      placeholder="First Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Control
                      type="text"
                      className="login-input"
                      placeholder="Last Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="email"
                      className="login-input"
                      placeholder="Email Address"
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Control
                      type="password"
                      className="login-input"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button block size="lg" type="submit" className="login-btn">
                    <span>Sign Up</span>
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
