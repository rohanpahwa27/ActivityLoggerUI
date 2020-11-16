import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../GlobalComponents/LoggedInHeader.js";
import TeamList from "./TeamList/TeamList.js";
import MemberSearch from "./MemberSearch/MemberSearch.js";
import { UserContext } from "../Context/UserContext.js";
import "./Team.css";

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_list: [],
    };

    this.setList = this.setList.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  setList(members) {
    this.setState({
      team_list: members,
    });
  }

  addUser(member) {
    this.setState({
      team_list: [...this.state.team_list, member],
    });
  }

  removeUser(email) {
    var list = [...this.state.team_list];
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].email === email) {
        idx = i;
        break;
      }
    }
    list.splice(idx, 1);
    this.setState({
      team_list: list,
    });
  }

  render() {
    document.body.style = "background: white !important;";
    return (
      <div
        className="justify-content-center"
        style={{
          backgroundColor: "white",
          position: "relative",
          zIndex: 1000,
        }}
      >
        <Header />
        <Container
          style={{
            paddingTop: 50,
          }}
        >
          <Row>
            <Col sm={4} md={4} lg={4}>
              <UserContext.Consumer>
                {({ userObj, updateUser }) => (
                  <TeamList
                    user={userObj}
                    teamList={this.state.team_list}
                    setTeamList={this.setList}
                    removeUser={this.removeUser}
                  />
                )}
              </UserContext.Consumer>
            </Col>
            <Col sm={8} md={8} lg={8}>
              <MemberSearch addUser={this.addUser} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
