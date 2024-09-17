import React from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import {BsEye, BsPencil, BsTrash} from "react-icons/bs";

const TableExamComponent = ({
  data = [],
  cols = [],
  isLoading,
  onView,
  onEdit,
  onDelete,
}) => {

  return (
    <div>
      <Table bordered hover>
        <thead>
          <tr style={{ textAlign: "center" }}>
            {cols.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={cols.length} style={{ textAlign: "center" }}>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ textAlign: "center" }}>
                <td>{row.STT}</td>
                <td>{row.subject}</td>
                <td>{row.classField}</td>
                <td>{row.examDate}</td>
                <td>{row.examLink}</td>
                <td>
                  <Button
                    variant="link"
                    size="sm"
                    className="me-2"
                    onClick={() => onView(row)}
                  >
                    <BsEye className="text-secondary"/>
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(row)}
                  >
                    <BsPencil className="text-primary" />
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => onDelete(row)}
                  >
                    <BsTrash  className="text-danger"/>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableExamComponent;
