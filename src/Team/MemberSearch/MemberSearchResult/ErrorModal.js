import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export default class ErrorModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Team Member Invalid
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.message}</p>
        </Modal.Body>
      </Modal>
    );
  }
}
