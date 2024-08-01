import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import FormComponent from "../FormComponent";

function ModalComponent({children, onHide, show, onSave, action, formFieldsProp, initialIsEdit, initialIdCurrent}) {


    const handleSave = (formData) => {
        console.log("Saving data in SubjectCreate...");
        console.log("Form data:", JSON.stringify(formData));
    };
    const [isEdit, setIsEdit] = useState(initialIsEdit || false);
    const [idCurrent, setIdCurrent] = useState(initialIdCurrent || 17);

    useEffect(() => {
        if (isEdit && idCurrent !== null) {
            setIdCurrent(initialIdCurrent);
            setIsEdit(false);
        }
    }, []);
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {action === "EDIT" ? "Cập nhật" : action === "VIEW" ? "" : "Thêm mới"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormComponent
                    fields={formFieldsProp}
                    onSubmit={handleSave}
                    isEdit={action === "EDIT"}
                    idCurrent={idCurrent}
                    onClose={onHide}
                />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;
