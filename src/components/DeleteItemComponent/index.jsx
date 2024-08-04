import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';

function DeleteComponent(props) {
    const {show, onHide, onConfirm, deleteItem, apiDelete} = props;

    const handleDelete = () => {
        if (deleteItem) {
            axios.delete(`${apiDelete}/${deleteItem.id}`)
                .then(() => {
                    console.log('Delete Successful: ' + JSON.stringify(deleteItem));
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
                <Modal.Title>Xác nhận Xoá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Bạn có chắc chắn muốn xoá <strong>{deleteItem ? deleteItem.name : ''}</strong> không?</p>
                <p>Hành động này không thể hoàn tác.</p>
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
