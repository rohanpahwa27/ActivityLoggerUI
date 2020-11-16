import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./MemberSearch.css";
import Result from "./MemberSearchResult/MemberSearchResult.js";
import { UserContext } from "../../Context/UserContext.js";
import api from "../../Api/api.js";

export default class MemberSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_results: [],
    };
    this.searchRef = React.createRef();
    this.searchUsers = this.searchUsers.bind(this);
  }

  async searchUsers() {
    const searchExp = this.searchRef.current.value;
    const response = await api.searchUser({
      userEmail: searchExp,
    });

    if (response.data.status === "error") {
      this.setState({
        search_results: [],
      });
      return;
    }

    var results = response.data.users;
    results.forEach(function (x) {
      delete x.password;
      delete x.admin;
    });

    this.setState({
      search_results: results,
    });
  }

  render() {
    const results = [];
    for (const x of this.state.search_results) {
      results.push(
        <Result
          firstName={x.firstName}
          lastName={x.lastName}
          email={x.email}
          addUser={this.props.addUser}
        />
      );
    }

    return (
      <UserContext.Consumer>
        {({ userObj, updateUser }) =>
          userObj.isAdmin ? (
            <Container>
              <Row>
                <Col sm={9} md={9} lg={9}>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="text"
                      className="login-input"
                      placeholder="Search users by email"
                      ref={this.searchRef}
                    />
                  </Form.Group>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Button
                    block
                    variant="outline-primary"
                    onClick={() => this.searchUsers()}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="pt-2" />
                  {this.state.search_results.length === 0 ? (
                    <div className="d-flex flex-column align-items-center pt-5">
                      <div>
                        <img
                          alt=""
                          src="/loupe.png"
                          width="100"
                          height="100"
                          className="d-inline-block align-top"
                        />
                      </div>
                      <div className="pt-3">
                        No results found. Please try another search.
                      </div>
                    </div>
                  ) : (
                    results
                  )}
                </Col>
              </Row>
            </Container>
          ) : (
            <div></div>
          )
        }
      </UserContext.Consumer>
    );
  }
}
