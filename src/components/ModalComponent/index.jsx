import React from 'react';
import {Modal} from 'react-bootstrap';
import FormComponent from "../FormComponent";
import axios from "axios";
import {toast} from "react-toastify";

function ModalComponent(props) {
    // Lấy các props cần thiết
    const {
        onHide,
        show,
        action,
        formFieldsProp,
        initialIdCurrent,
        apiUpdate,
        apiCreate,
        apiView,
        getData
    } = props;

    // Hàm xử lý khi lưu dữ liệu
    const handleSave = (formData) => {
        console.log("Saving data in SubjectCreate...");
        console.log("Form data:", JSON.stringify(formData));
        if (action === 'EDIT') {
            UpdateItem(formData);
        } else if (action === 'CREATE') {
            CreateItem(formData);
        }
    };

    // Hàm cập nhật item
    const UpdateItem = (formData) => {
        axios.put(`${apiUpdate}/${formData.id}`, formData)
            .then(response => {
                console.log('Update successful:', response);
                onHide();
                getData();
                toast.success("Cập nhật thành công!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch(error => {
                console.error('Có lỗi khi cập nhật item:', error);
            });
    };

    // Hàm tạo mới item
    const CreateItem = (formData) => {
        axios.post(apiCreate, formData)
            .then(response => {
                console.log('Create successful:', response);
                onHide();
                getData();
                toast.success("Tạo mới thành công!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch(error => {
                console.error('Có lỗi khi tạo mới item:', error);
            });
    };

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
                    isView={action === 'VIEW'}
                    idCurrent={initialIdCurrent}
                    onClose={onHide}
                    apiGetById={apiView}
                />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;
