import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalComponent({ children, onHide, show, onSave }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        onSave();
                        onHide();  // Close the modal after saving
                    }}
                >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;
