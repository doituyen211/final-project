import React from "react";
import Select from "react-select";
import { Modal, ModalHeader, ModalBody } from "react-bootstrap";

export default function UpdateForm({
  show,
  handleClose,
  dataRow,
  handleUpdate,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <span>Update</span>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Id : </label>
            <input type="number" value={dataRow.id} disabled></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Name : </label>
            <input type="text" value={dataRow.studenName} disabled></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Trainning Program : </label>
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Subject : </label>
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Exam Date : </label>
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Grade : </label>
            <input type="number"></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
