import React, { Component } from "react";
import "./LoginCard.css";
import { Form, Button, Container, Row, Col, Collapse } from "react-bootstrap";
import api from "../../Api/api.js";
import { UserContext } from "../../Context/UserContext.js";
import { withRouter } from "react-router-dom";

class LoginCard extends Component {
  constructor(props) {
    super(props);
    this.state = { invalidCredentials: false };
  }

  async handleLogin(event, updateUser) {
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
    } else {
      updateUser({ email: email, isAdmin: response.data.user.isAdmin });
      localStorage.setItem("email", email);
      localStorage.setItem("isAdmin", response.data.user.isAdmin);
      this.props.history.push("/dashboard");
    }
  }

  render() {
    document.body.style = "background: #3e88ef !important;";
    return (
      <UserContext.Consumer>
        {({ userObj, updateUser }) => (
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
                    <Form onSubmit={(e) => this.handleLogin(e, updateUser)}>
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
                      <Collapse in={this.state.invalidCredentials}>
                        <div>
                          <div className="d-flex flex-row invalid-credentials-container">
                            <div className="alert-icon-container">
                              <img
                                alt=""
                                src="/alert.png"
                                width="20"
                                height="20"
                                className="d-inline-block align-top"
                              />
                            </div>
                            <div>
                              Unable to log in with provided credentials.
                            </div>
                          </div>
                        </div>
                      </Collapse>
                      <Button
                        block
                        size="lg"
                        type="submit"
                        className="login-btn"
                      >
                        <span>Login</span>
                      </Button>
                    </Form>
                  </div>
                </div>
                <div>
                  <p className="get-started-text">
                    Don't have an account?{" "}
                    <strong>
                      <a className="get-started-link" href="/signup">
                        Get started
                      </a>
                    </strong>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </UserContext.Consumer>
    );
  }
}

export default withRouter(LoginCard);
