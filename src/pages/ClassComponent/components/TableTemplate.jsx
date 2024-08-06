import React from "react";
import { Button, Table } from "react-bootstrap";
import useClassStore from "../useClassStore";

const TableTemplate = ({ columns, dataTable }) => {
  const setMode = useClassStore((state) => state.setMode);
  const setShowModalCommon = useClassStore((state) => state.setShowModalCommon);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {dataTable?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
            <td>
              <Button
                variant="light"
                className="me-2"
                onClick={() => {
                  setMode(true);
                  setShowModalCommon(true);
                }}
              >
                View
              </Button>
              <Button
                variant="primary"
                className="me-2"
                onClick={() => {
                  setMode(false);
                  setShowModalCommon(true);
                }}
              >
                Edit
              </Button>

              <Button variant="danger">Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableTemplate;
