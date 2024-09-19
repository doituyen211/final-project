import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function AllowanceEditComponents({ show, handleClose, item, handleSave }) {
    const [formState, setFormState] = useState(item || {
        idCV: '',
        loaiPC: '',
        luongPC: '',
        trangThai: false,
        create_at: '',
        update_at: '',
    });

    useEffect(() => {
        if (item) {
            setFormState(item);
        }
    }, [item]);

    const handleSubmit = () => {
        if (formState) {
            handleSave(formState);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa phụ cấp</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>ID Chức vụ</Form.Label>
                    <Form.Control
                        type="number"
                        value={formState.idCV || ''}
                        onChange={(e) => setFormState({ ...formState, idCV: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Loại phụ cấp</Form.Label>
                    <Form.Control
                        type="text"
                        value={formState.loaiPC || ''}
                        onChange={(e) => setFormState({ ...formState, loaiPC: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Lương phụ cấp</Form.Label>
                    <Form.Control
                        type="number"
                        value={formState.luongPC || ''}
                        onChange={(e) => setFormState({ ...formState, luongPC: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ngày tạo</Form.Label>
                    <Form.Control
                        type="date"
                        value={formState.create_at || ''}
                        onChange={(e) => setFormState({ ...formState, create_at: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ngày sửa</Form.Label>
                    <Form.Control
                        type="date"
                        value={formState.update_at || ''}
                        onChange={(e) => setFormState({ ...formState, update_at: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Hoạt động"
                        checked={formState.trangThai || false}
                        onChange={(e) => setFormState({ ...formState, trangThai: e.target.checked })}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default AllowanceEditComponents;