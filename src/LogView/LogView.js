import React, { Component } from "react";
import "./LogView.css";
import { withRouter } from "react-router-dom";
import Header from "../GlobalComponents/LoggedInHeader";
import NoLogResult from "./NoLogResult/NoLogResult.js";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";

class LogView extends Component {
  constructor(props) {
    super(props);
    this.textSearch = React.createRef();
    this.regexSearch = React.createRef();

    this.state = {
      hasMoreItems: true,
      logs: [
        {
          date: "10/08/2020",
          content:
            "PaymentServiceUnavailableError: Payment service reported 503 Unavailable.",
        },
        {
          date: "10/08/2020",
          content:
            "PaymentServiceUnavailableError: Payment service reported 503 Unavailable.",
        },
        {
          date: "10/08/2020",
          content:
            "PaymentServiceUnavailableError: Payment service reported 503 Unavailable.",
        },
        {
          date: "10/08/2020",
          content:
            "PaymentServiceUnavailableError: Payment service reported 503 Unavailable.",
        },
        {
          date: "10/08/2020",
          content:
            "PaymentServiceUnavailableError: Payment service reported 503 Unavailable.",
        },
        {
          date: "10/08/2020",
          content:
            "PaymentServiceUnavailableError: Payment service reported 503 Unavailable.",
        },
      ],
    };

    this.loadItems = this.loadItems.bind(this);
  }

  loadItems(page) {
    this.setState({
      logs: [...this.state.logs, ...this.state.logs],
      hasMoreItems: false,
    });
    const app = this.props.match.params.application;
  }

  componentDidMount() {
    const app = this.props.match.params.application;
  }

  render() {
    document.body.style = "background: white !important;";
    const loader = <div className="loader">Loading ...</div>;

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
              <Button block variant="outline-primary">
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
                  this.setState({
                    logs: null,
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
                  this.setState({
                    logs: null,
                  })
                }
              >
                Show All Logs
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.state.logs ? (
                <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadItems}
                  hasMore={this.state.hasMoreItems}
                  loader={loader}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Content</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.logs.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item.date}</td>
                            <td>{item.content}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </InfiniteScroll>
              ) : (
                <NoLogResult />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(LogView);
