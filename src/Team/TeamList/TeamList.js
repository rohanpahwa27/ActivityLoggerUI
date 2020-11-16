import React, { Component } from "react";
import "./TeamList.css";
import MemberCard from "./MemberCard/MemberCard.js";
import api from "../../Api/api.js";

export default class TeamList extends Component {
  async componentDidMount() {
    const response = await api.findTeam({
      userEmail: this.props.user.email,
    });

    var teamList = response.data.team;
    teamList.forEach(function (x) {
      delete x.password;
    });
    this.props.setTeamList(teamList);
  }

  render() {
    const members = [];
    for (const x of this.props.teamList) {
      members.push(
        <MemberCard
          firstName={x.firstName + " "}
          lastName={x.lastName + " - "}
          isAdmin={x.admin}
          email={x.email}
          removeUser={this.props.removeUser}
        />
      );
    }
    return (
      <div className="d-flex flex-column list-shadow">
        <div className="active-title-text pl-3 pt-2 pb-2 d-flex flex-row align-items-center">
          <div className="d-flex flex-row align-items-center">
            <img
              alt=""
              src="/group.png"
              width="25"
              height="24"
              className="d-inline-block align-top"
            />
          </div>
          <div className="d-flex flex-row align-items-center pl-1 pt-2 pb-2">
            Your Team
          </div>
        </div>
        <div
          style={{
            overflowY: "auto",
            height: "70vh",
          }}
        >
          {members}
        </div>
      </div>
    );
  }
}
