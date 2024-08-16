import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function AllowanceFormComponents() {
    const [formState, setFormState] = useState({
        idCV: '',
        loaiPC: '',
        luongPC: '',
        trangThai: false,
        create_at: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send form data to API or local state
        console.log(formState);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>ID Chức vụ</Form.Label>
                <Form.Control type="number" value={formState.idCV} onChange={(e) => setFormState({ ...formState, idCV: e.target.value })} required />
            </Form.Group>
            {/* Repeat above for other form fields */}
            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default AllowanceFormComponents;