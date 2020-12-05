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

  async loadItems(page) {
    const app = this.props.match.params.application;
    var resp_logs = null;
    const real_page = page - 1;
    const response = await apis.getLogs({
      name: app,
      pageNumber: real_page,
    });
    resp_logs = response.data.logs;

    var logs = [];
    for (var i = 0; i < resp_logs.length; i++) {
      logs.push({
        date: resp_logs[i].timestamp,
        content: resp_logs[i].log,
        level: resp_logs[i].level,
        pinned: true,
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

  unpinLog(idx) {
    let logs = [...this.state.logs];
    logs.splice(idx, 1);
    this.setState({
      logs: logs,
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
