import React from "react";
import {Button} from "react-bootstrap";
import {Plus} from "react-bootstrap-icons";

const ButtonAddComponent = ({ setShowAddModal}) => {
    return (
        <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="float-right mb-3 d-flex align-items-center"
        >
            Thêm mới
            <div className="ml-1">
                <Plus size={22} />
            </div>
        </Button>
    );
};
    export default ButtonAddComponent;