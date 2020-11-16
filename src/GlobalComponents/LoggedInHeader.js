import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { UserContext } from "../Context/UserContext.js";
import { withRouter } from "react-router-dom";
import "./LoggedInHeader.scss";

class LoggedInHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdownMenu: false,
    };
  }

  render() {
    return (
      <Navbar
        sticky="top"
        className="home-header"
        expand="md"
        collapseOnSelect={true}
      >
        <Navbar.Brand className="pl-1 pl-md-4 home-brand" href="/dashboard">
          Activity Logger
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="nav-items" href="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link className="nav-items" href="/team">
              Team
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title="Account"
              className="nav-items"
              show={this.state.showDropdownMenu}
              onMouseEnter={() =>
                this.setState({
                  showDropdownMenu: true,
                })
              }
              onMouseLeave={() =>
                this.setState({
                  showDropdownMenu: false,
                })
              }
              alignRight
            >
              <UserContext.Consumer>
                {({ userObj, updateUser }) => (
                  <NavDropdown.Item
                    className="pt-3 pb-3"
                    onClick={() => {
                      updateUser(null);
                      localStorage.clear();
                      this.props.history.push("/");
                    }}
                  >
                    <div className="d-flex flex-row align-items-center nav-dropdown-items">
                      <span className="d-flex flex-row align-items-center pr-2">
                        <img alt="" src="/logout.png" width="23" height="23" />
                      </span>
                      Log Out
                    </div>
                  </NavDropdown.Item>
                )}
              </UserContext.Consumer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(LoggedInHeader);
