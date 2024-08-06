import React from "react";
import SearchComponent from "./SearchComponent"
import { Button } from "react-bootstrap";

const ToolsComponent = ({
  setModalShow,
  setModalProps,
  handleSave,
  formFieldsProp,
  apiCreate,
}) => {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <SearchComponent />
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          setModalShow(true);
          setModalProps({
            onHide: () => setModalShow(false),
            onSave: handleSave,
            action: "CREATE",
            formFieldsProp: formFieldsProp,
            initialIsEdit: true,
            initialIdCurrent: null,
            // apiUpdate: apiUpdate,
            apiCreate: apiCreate,
          });
        }}
      >
        <i className="bi bi-plus-circle"></i>
      </Button>
    </div>
  );
};

export default ToolsComponent;
