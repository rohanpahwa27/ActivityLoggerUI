import React, { Component } from "react";
import "./SignupCard.css";
import { Form, Button, Container, Row, Col, Collapse } from "react-bootstrap";

export default class SignupCard extends Component {
  constructor(props) {
    super(props);
  }

  handleSignup(event) {
    event.preventDefault();
    
  }

  render() {
    return (
      <Container className="signup-container">
        <Row>
          <Col
            sm={{ span: 12 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
          >
            <div>
              <p className="welcome-text">Welcome!</p>
            </div>
            <div className="d-flex flex-column signup-card p-3 p-lg-5">
              <div>
                <Form onSubmit={(e) => this.handleSignup(e)}>
                <Form.Group controlId="firstName">
                    <Form.Control
                      type="text"
                      className="signup-input"
                      placeholder="First Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Control
                      type="text"
                      className="signup-input"
                      placeholder="Last Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      className="signup-input"
                      placeholder="Email Address"
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      className="signup-input"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Button block size="lg" type="submit" className="signup-btn">
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
