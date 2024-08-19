import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function AllowanceEditComponents({ item, handleClose, handleSave }) {
    const [formState, setFormState] = useState({
        id: item.id,
        idCV: item.idCV,
        loaiPC: item.loaiPC,
        luongPC: item.luongPC,
        trangThai: item.trangThai,
        create_at: item.create_at,
        update_at: item.update_at,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formState);
        handleClose();
    };
console.log('render AllowanceEditComponents: ');
    return (
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Phụ cấp</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Repeat above for other form fields */}
                    <Button type="submit">Save Changes</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AllowanceEditComponents;