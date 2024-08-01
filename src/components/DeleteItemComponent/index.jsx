import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';

function DeleteComponent({show, onHide, onConfirm, deleteItem, apiDelete}) {
    const handleDelete = () => {
        if (deleteItem) {
            axios.delete(apiDelete + `/${deleteItem.id}`)
                .then((res) => {
                   
                    console.log('Delete Successful: ' + JSON.stringify(deleteItem));
                    if (onConfirm) onConfirm();  // Call onConfirm to notify parent
                })
                .catch((error) => {
                    // Handle error if any
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
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this item?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteComponent;
