import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext.js";
import "./MemberCard.css";
import api from "../../../Api/api.js";

export default class MemberCard extends Component {
  constructor(props) {
    super(props);
    this.removeFromTeam = this.removeFromTeam.bind(this);
  }

  async removeFromTeam(adminEmail) {
    await api.removeUser({
      adminEmail: adminEmail,
      userEmail: this.props.email,
    });

    this.props.removeUser(this.props.email);
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ userObj, updateUser }) => (
          <div className="pt-3">
            <Container fluid>
              <Row>
                <Col sm={8} md={8} lg={8} style={{}}>
                  <div className="d-flex flex-column">
                    <div className="fund-text">
                      {this.props.firstName +
                        this.props.lastName +
                        (this.props.isAdmin ? "Admin" : "User")}
                    </div>
                    <div className="company-text">{this.props.email}</div>
                  </div>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  {this.props.email !== userObj.email &&
                    userObj.isAdmin === "true" && (
                      <div className="center-btn">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          block
                          onClick={async () => {
                            await this.removeFromTeam(userObj.email);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
