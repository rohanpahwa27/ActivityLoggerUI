import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { UserContext } from "../../../Context/UserContext.js";
import "./MemberSearchResult.css";
import api from "../../../Api/api.js";
import ErrorModal from "./ErrorModal.js";

export default class MemberSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorModal: false,
      error: "",
    };
    this.addToTeam = this.addToTeam.bind(this);
    this.setModalShow = this.setModalShow.bind(this);
  }

  setModalShow(showErrorModal) {
    this.setState({
      showErrorModal: showErrorModal,
    });
  }

  async addToTeam(adminEmail) {
    console.log(adminEmail);
    const response = await api.addUser({
      adminEmail: adminEmail,
      userEmail: this.props.email,
    });

    if (response.data.status === "error") {
      this.setState({
        showErrorModal: true,
        error: response.data.message,
      });
      return;
    }

    const teamMember = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      isAdmin: false,
    };

    this.props.addUser(teamMember);
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ userObj, updateUser }) => (
          <div className="mb-3 pt-2 pb-2 result-card">
            <Container fluid>
              <Row>
                <Col sm={8} md={8} lg={8}>
                  <div className="d-flex flex-column">
                    <div className="fund-text">
                      {this.props.firstName + " " + this.props.lastName}
                    </div>
                    <div className="company-text">{this.props.email}</div>
                  </div>
                </Col>
                <Col sm={4} md={4} lg={4} className="d-flex align-items-center">
                  <Button
                    variant="success"
                    size="sm"
                    block
                    onClick={async () => {
                      await this.addToTeam(userObj.email);
                    }}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Container>
            <ErrorModal
              show={this.state.showErrorModal}
              message={this.state.error}
              onHide={() => this.setModalShow(false)}
            />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
