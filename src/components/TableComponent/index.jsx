import React from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import PropTypes from "prop-types";

function TableComponents({
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
  isLoading, // Add isLoading prop
}) {
  return (
    <>
      <h2>{titleTable}</h2>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table className={classTable}>
          <thead>
            <tr>
              {Array.isArray(cols) &&
                cols.map((col, index) => <th key={index}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 10 * (currentPage - 1) + 1}</td>
                {formFieldsProp.map((field, cellIndex) => (
                  <td key={cellIndex}>{row[field.name]}</td>
                ))}
                <td className="text-center">
                  <Button
                    variant="light"
                    className="me-2"
                    onClick={() => {
                      if (!useModal) {
                        actionView(row);
                      } else {
                        openModal("VIEW", true, row);
                      }
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => {
                      if (!useModal) {
                        actionEdit(row);
                      } else {
                        openModal("EDIT", true, row);
                      }
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => actionDelete(row)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

TableComponents.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  titleTable: PropTypes.string.isRequired,
  dataTable: PropTypes.arrayOf(PropTypes.object).isRequired,
  classTable: PropTypes.string,
  formFieldsProp: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  actionView: PropTypes.func.isRequired,
  actionEdit: PropTypes.func.isRequired,
  useModal: PropTypes.bool,
  actionDelete: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  isLoading: PropTypes.bool, // Add propTypes for isLoading
};

TableComponents.defaultProps = {
  classTable: "table table-bordered table-hover",
  useModal: true,
  isLoading: false, // Default value for isLoading
};

export default TableComponents;
