import React, { Component } from "react";
import "./NoLogResult.css";

export default class NoLogResult extends Component {
  render() {
    return (
      <div>
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
          <div className="pt-3">No logs found. Please try another search.</div>
        </div>
      </div>
    );
  }
}
