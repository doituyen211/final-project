import React from "react";
import { Button } from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs"; // Import Bootstrap icons
import PropTypes from "prop-types";

function TableComponents(props) {
  const {
    cols,
    titleTable,
    dataTable,
    classTable,
    formFieldsProp,
    actionView,
    actionEdit,
    useModal,
    actionDelete,
    openModal,
    currentPage,
  } = props;

  return (
    <>
      <h2>{titleTable}</h2>
      <table className={classTable}>
        <thead>
          <tr>
            {Array.isArray(cols) &&
              cols.map((col, index) => (
                <th key={index} style={{ textAlign: "center" }}>
                  {col}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {dataTable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 10 * (currentPage - 1) + 1}</td>
              {/*<td>{row.id}</td>*/}
              {formFieldsProp.map((field, cellIndex) => (
                <td key={cellIndex}>{row[field.name]}</td>
              ))}
              <td className="text-center">
                <Button
                  variant="link"
                  className="me-2"
                  onClick={() => {
                    if (!useModal) {
                      console.log("Using actionView");
                      actionView(row);
                    } else {
                      console.log("Using default view action");
                      openModal("VIEW", true, row);
                    }
                  }}
                >
                  <BsEye className="text-secondary"/>
                </Button>
                <Button
                  variant="link"
                  className="me-2"
                  onClick={() => {
                    if (!useModal) {
                      console.log("Using actionEdit");
                      actionEdit(row);
                    } else {
                      console.log("Using default edit action");
                      openModal("EDIT", true, row);
                    }
                  }}
                >
                  <BsPencil className="text-primary" />
                </Button>

                <Button variant="link" onClick={() => actionDelete(row)}>
                  <BsTrash  className="text-danger"/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableComponents;
