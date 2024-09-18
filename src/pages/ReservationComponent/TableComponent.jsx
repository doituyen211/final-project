import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import DeleteComponent from "./DeleteComponent";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";

function TableComponents({
  cols,
  titleTable,
  dataTable,
  classTable,
  apiDelete,
  apiUpdate,
  apiView,
  formFieldsProp,
  getData,
}) {
  const [modalShow, setModalShow] = useState(false);
  const [modalProps, setModalProps] = useState({
    action: "",
    formFieldsProp: formFieldsProp,
    initialIsEdit: false,
    initialIdCurrent: null,
    apiUpdate: apiUpdate,
    apiView: apiView,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleSave = (formData) => {
    console.log("Saving data...");
    console.log("Form data:", formData);
    getData();
    // Your save logic here
  };

  const handleDeleteConfirmation = () => {
    getData();
  };

  const confirmDelete = (item) => {
    setDeleteItem(item);
    setShowConfirmModal(true);
  };

  // Function to get inline style for status based on status value
  const getStatusStyle = (status) => {
    return {
      color: status === 1 ? "green" : "red",
      fontWeight: "bold",
    };
  };

  return (
    <>
      <h2>{titleTable}</h2>
      <table className={classTable}>
        <thead>
          <tr>
            {Array.isArray(cols) &&
              cols.map((col, index) => <th key={index}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {dataTable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.id}</td>
              {formFieldsProp.map((field, cellIndex) => (
                <td
                  key={cellIndex}
                  style={
                    field.name === 'status' ? getStatusStyle(row[field.name]) : {}
                  }
                >
                  {field.name === 'status'
                    ? (row[field.name] === 1 ? "Đang bảo lưu" : "Hết bảo lưu")
                    : row[field.name]}
                </td>
              ))}
              <td className="text-center">
                <Button
                  variant="link"
                  className="me-2"
                  onClick={() => {
                    setModalProps({
                      onHide: () => setModalShow(false),
                      onSave: handleSave,
                      action: "VIEW",
                      formFieldsProp: formFieldsProp,
                      initialIsEdit: true,
                      initialIdCurrent: row.id,
                      apiUpdate: apiUpdate,
                      apiView: apiView,
                    });
                    setModalShow(true);
                  }}
                >
                  <BsEye className="text-secondary" />
                </Button>
                <Button
                  variant="link"
                  className="me-2"
                  onClick={() => {
                    setModalProps({
                      onHide: () => setModalShow(false),
                      onSave: handleSave,
                      action: "EDIT",
                      formFieldsProp: formFieldsProp,
                      initialIsEdit: true,
                      initialIdCurrent: row.id,
                      apiUpdate: apiUpdate,
                      apiView: apiView,
                    });
                    setModalShow(true);
                  }}
                >
                  <BsPencil className="text-primary" />
                </Button>
                <Button variant="link" onClick={() => confirmDelete(row)}>
                  <BsTrash className="text-danger" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalComponent show={modalShow} getData={getData} {...modalProps} />
      <DeleteComponent
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onConfirm={handleDeleteConfirmation}
        deleteItem={deleteItem}
        apiDelete={apiDelete}
      />
    </>
  );
}

export default TableComponents;
