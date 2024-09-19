import React from 'react';
import { Form, Button } from 'react-bootstrap';

function AllowanceFormComponents({ formState, setFormState, handleSubmit }) {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>ID Chức vụ</Form.Label>
                <Form.Control
                    type="number"
                    value={formState.idCV}
                    onChange={(e) => setFormState({ ...formState, idCV: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Loại phụ cấp</Form.Label>
                <Form.Control
                    type="text"
                    value={formState.loaiPC}
                    onChange={(e) => setFormState({ ...formState, loaiPC: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Lương phụ cấp</Form.Label>
                <Form.Control
                    type="number"
                    value={formState.luongPC}
                    onChange={(e) => setFormState({ ...formState, luongPC: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ngày tạo</Form.Label>
                <Form.Control
                    type="date"
                    value={formState.create_at}
                    onChange={(e) => setFormState({ ...formState, create_at: e.target.value })}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ngày sửa</Form.Label>
                <Form.Control
                    type="date"
                    value={formState.update_at}
                    onChange={(e) => setFormState({ ...formState, update_at: e.target.value })}
                />
            </Form.Group>
            <Form.Group>
                <Form.Check
                    type="checkbox"
                    label="Hoạt động"
                    checked={formState.trangThai}
                    onChange={(e) => setFormState({ ...formState, trangThai: e.target.checked })}
                />
            </Form.Group>
            <Button type="submit">Gửi</Button>
        </Form>
    );
}

export default AllowanceFormComponents;
