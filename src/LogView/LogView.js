import React, { Component } from "react";
import "./LogView.css";
import { withRouter } from "react-router-dom";
import Header from "../GlobalComponents/LoggedInHeader";
import NoLogResult from "./NoLogResult/NoLogResult.js";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import apis from "../Api/api";
const FileDownload = require("js-file-download");

class LogView extends Component {
  constructor(props) {
    super(props);
    this.textSearch = React.createRef();
    this.regexSearch = React.createRef();

    this.state = {
      hasMoreItems: true,
      logs: [],
      searchObj: null,
      newID: 1,
    };

    this.pinnedLogs = new Set();

    this.loadItems = this.loadItems.bind(this);
    this.computeColor = this.computeColor.bind(this);
    this.pinLog = this.pinLog.bind(this);
    this.exportLog = this.exportLog.bind(this);
  }

  async loadItems(page) {
    const app = this.props.match.params.application;
    var resp_logs = null;
    const real_page = page - 1;
    if (this.state.searchObj === null) {
      const response = await apis.getLogs({
        name: app,
        pageNumber: real_page,
        userEmail: localStorage.getItem("email"),
      });
      resp_logs = response.data.logs;
    } else if (this.state.searchObj.type === "text") {
      const response = await apis.getLogsByText({
        name: app,
        pageNumber: real_page,
        text: this.state.searchObj.text,
        userEmail: localStorage.getItem("email"),
      });
      resp_logs = response.data.logs;
    } else {
      const response = await apis.getLogsByRegex({
        name: app,
        pageNumber: real_page,
        text: this.state.searchObj.text,
        userEmail: localStorage.getItem("email"),
      });
      resp_logs = response.data.logs;
    }

    var logs = [];
    for (var i = 0; i < resp_logs.length; i++) {
      logs.push({
        date: resp_logs[i].timestamp,
        content: resp_logs[i].log,
        level: resp_logs[i].level,
        _id: resp_logs[i]._id,
        pinned: resp_logs[i].pinned,
      });
    }

    if (logs.length === 0) {
      this.setState({
        hasMoreItems: false,
      });
      return;
    }

    this.setState({
      logs: [...this.state.logs, ...logs],
      hasMoreItems: true,
    });
  }

  computeColor(type) {
    switch (type) {
      case "WARN":
        return "#ffc107";
      case "INFO":
        return "#17a2b8";
      case "ERROR":
        return "#dc3545";
      case "DEBUG":
        return "#28a745";
      default:
        return "#343a40";
    }
  }

  async pinLog(idx) {
    let logs = [...this.state.logs];
    let log = { ...logs[idx] };
    log.pinned = true;
    logs[idx] = log;
    this.setState({
      logs: logs,
    });

    await apis.pinLog({
      logID: log._id,
      userEmail: localStorage.getItem("email"),
    });
  }

  async exportLog() {
    const app = this.props.match.params.application;
    var response = null;
    if (this.state.searchObj === null) {
      response = await apis.exportLogs({
        name: app,
        text: "",
      });
    } else if (this.state.searchObj.type === "text") {
      response = await apis.exportLogs({
        name: app,
        text: this.state.searchObj.text,
      });
    } else {
      response = await apis.exportLogs({
        name: app,
        text: this.state.searchObj.text,
      });
    }

    FileDownload(response.data, "logs.txt");
  }

  render() {
    document.body.style = "background: white !important;";
    const loader = (
      <div className="loader" key={0}>
        Loading ...
      </div>
    );

    return (
      <div className="justify-content-center">
        <Header />
        <Container
          style={{
            paddingTop: 50,
          }}
          fluid
        >
          <Row
            style={{
              paddingBottom: 50,
            }}
          >
            <Col sm={9} md={9} lg={9}>
              <Form.Group controlId="text_search">
                <Form.Control
                  type="text"
                  className="login-input"
                  placeholder="Search Logs by Text"
                  ref={this.textSearch}
                />
              </Form.Group>
            </Col>
            <Col sm={3} md={3} lg={3}>
              <Button
                block
                variant="outline-primary"
                onClick={() =>
                  this.setState((prevState) => {
                    this.regexSearch.current.value = "";
                    return {
                      ...prevState,
                      searchObj: {
                        text: this.textSearch.current.value,
                        type: "text",
                      },
                      logs: [],
                      newID: prevState.newID + 1,
                      hasMoreItems: true,
                    };
                  })
                }
              >
                Search
              </Button>
            </Col>
            <Col sm={9} md={9} lg={9}>
              <Form.Group controlId="regex_search">
                <Form.Control
                  type="text"
                  className="login-input"
                  placeholder="Search Logs by Regex"
                  ref={this.regexSearch}
                />
              </Form.Group>
            </Col>
            <Col sm={3} md={3} lg={3}>
              <Button
                block
                variant="outline-primary"
                onClick={() =>
                  this.setState((prevState) => {
                    this.textSearch.current.value = "";
                    return {
                      ...prevState,
                      searchObj: {
                        text: this.regexSearch.current.value,
                        type: "regex",
                      },
                      logs: [],
                      newID: prevState.newID + 1,
                      hasMoreItems: true,
                    };
                  })
                }
              >
                Search
              </Button>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <Button
                block
                variant="outline-primary"
                onClick={() =>
                  this.setState((prevState) => {
                    this.textSearch.current.value = "";
                    this.regexSearch.current.value = "";
                    return {
                      ...prevState,
                      searchObj: null,
                      logs: [],
                      newID: prevState.newID + 1,
                      hasMoreItems: true,
                    };
                  })
                }
              >
                Show All Logs
              </Button>
            </Col>
            <Col sm={12} md={12} lg={12} className="pt-3">
              <Button
                block
                variant="outline-success"
                onClick={() => this.exportLog()}
              >
                Export Logs
              </Button>
            </Col>
          </Row>
          <Row>
            <Col key={this.state.newID}>
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems}
                hasMore={this.state.hasMoreItems}
                loader={this.state.logs.length === 0 ? null : loader}
                initialLoad={true}
              >
                {this.state.logs.length === 0 ? (
                  <NoLogResult pinned={false} />
                ) : (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Date</th>
                        <th>Content</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.logs.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <div className="d-flex flex-row">
                                <div
                                  style={{
                                    width: 10,
                                    backgroundColor: this.computeColor(
                                      item.level.toUpperCase()
                                    ),
                                    borderRadius: 5,
                                  }}
                                ></div>
                                <div className="pl-1">
                                  {item.level.toUpperCase()}
                                </div>
                              </div>
                            </td>
                            <td>{item.date}</td>
                            <td>{item.content}</td>
                            <td>
                              <Button
                                size="sm"
                                variant="secondary"
                                disabled={this.state.logs[i].pinned}
                                onClick={() => this.pinLog(i)}
                              >
                                {this.state.logs[i].pinned ? "Pinned" : "Pin"}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </InfiniteScroll>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(LogView);
