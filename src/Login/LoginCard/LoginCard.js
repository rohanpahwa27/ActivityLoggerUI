import React, { Component } from "react";
import "./LoginCard.css";
import { Form, Button, Container, Row, Col, Collapse } from "react-bootstrap";

export default class LoginCard extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin(event) {
    event.preventDefault();
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
              <p className="welcome-text">Welcome Back!</p>
            </div>
            <div className="d-flex flex-column login-card p-3 p-lg-5">
              <div>
                <Form onSubmit={(e) => this.handleLogin(e)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      className="login-input"
                      placeholder="Email Address"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
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
