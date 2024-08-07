import React from "react";
import { Button } from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs"; // Import Bootstrap icons

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
                  variant="light"
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
                  <BsEye />
                </Button>
                <Button
                  variant="primary"
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
                  <BsPencil />
                </Button>

                <Button variant="danger" onClick={() => actionDelete(row)}>
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
