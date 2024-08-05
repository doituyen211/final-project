import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';

function DeleteComponent(props) {
    const {show, onHide, onConfirm, deleteItemID, apiDelete} = props;

    const handleDelete = () => {
<<<<<<< HEAD
        if (deleteItem) {
            axios.delete(apiDelete + `/${deleteItem.id}`)
                .then((res) => {

                    console.log('Delete Successful: ' + JSON.stringify(deleteItem));
=======
        if (deleteItemID) {
            axios.delete(`${apiDelete}/${deleteItemID}`)
                .then(() => {
                    console.log('Delete Successful: ' + JSON.stringify(deleteItemID));
>>>>>>> crm_education
                    if (onConfirm) onConfirm();  // Call onConfirm to notify parent
                })
                .catch((error) => {
                    console.error('Error deleting item:', error);
                })
                .finally(() => {
                    onHide();  // Close modal
                });
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
<<<<<<< HEAD
                <Modal.Title>Xác nhận xoá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn cos chắc chăn muốn xoá không ?
=======
                <Modal.Title>Xác nhận Xoá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có chắc chắn muốn xoá không?</p>
                <p>Hành động này không thể hoàn tác.</p>
>>>>>>> crm_education
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Huỷ bỏ
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Xoá
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteComponent;
