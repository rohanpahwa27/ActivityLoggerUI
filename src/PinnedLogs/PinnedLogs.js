import React, { Component } from "react";
import "./PinnedLogs.css";
import { withRouter } from "react-router-dom";
import Header from "../GlobalComponents/LoggedInHeader";
import NoLogResult from "../LogView/NoLogResult/NoLogResult.js";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";
import apis from "../Api/api";

class PinnedLogs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMoreItems: true,
      logs: [],
    };

    this.loadItems = this.loadItems.bind(this);
    this.computeColor = this.computeColor.bind(this);
    this.unpinLog = this.unpinLog.bind(this);
  }

  async componentDidMount() {
    const response = await apis.getPinnedLogs({
      userEmail: localStorage.getItem("email"),
      application: this.props.match.params.application,
    });
    const resp_logs = response.data.logs;

    var logs = [];
    for (var i = 0; i < resp_logs.length; i++) {
      logs.push({
        date: resp_logs[i].timestamp,
        content: resp_logs[i].log,
        level: resp_logs[i].level,
        _id: resp_logs[i]._id,
        pinned: true,
      });
    }

    this.setState({
      logs: [...this.state.logs, ...logs],
      hasMoreItems: false,
    });
  }

  async loadItems(page) {}

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

  async unpinLog(idx) {
    let logs = [...this.state.logs];
    let log = logs[idx];
    logs.splice(idx, 1);
    this.setState({
      logs: logs,
    });

    await apis.unpinLog({
      logID: log._id,
      userEmail: localStorage.getItem("email"),
    });
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
          <Row>
            <Col>
              <div
                style={{
                  paddingBottom: 15,
                  fontWeight: "bold",
                }}
              >
                Pinned Logs
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems}
                hasMore={this.state.hasMoreItems}
                loader={this.state.logs.length === 0 ? null : loader}
                initialLoad={true}
              >
                {this.state.logs.length === 0 ? (
                  <NoLogResult pinned={true} />
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
                                disabled={!this.state.logs[i].pinned}
                                onClick={() => this.unpinLog(i)}
                              >
                                {this.state.logs[i].pinned
                                  ? "Unpin"
                                  : "Unpinned"}
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

export default withRouter(PinnedLogs);
