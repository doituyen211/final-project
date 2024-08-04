import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from "../SelectDownButton";
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";
import Input from "../InputComponents";

// Cập nhật tên hàm từ FormComponent({ fields, onSubmit, isEdit, idCurrent, onClose, isView, apiGetById }) thành FormComponent(props)
function FormComponent(props) {
    const {fields, onSubmit, isEdit, idCurrent, onClose, isView, apiGetById} = props;

    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({...acc, [field.name]: ''}), {})
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    useEffect(() => {
        console.log(isView);
        if (isEdit || isView) {
            const url = `${apiGetById}/${idCurrent}`;
            axios.get(url)
                .then((res) => {
                    setFormData(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                });
        }
        console.log('Render FORMComponent');

    }, [isEdit, idCurrent, isView, apiGetById]);

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                {fields.map((field) => {
                    switch (field.type) {
                        case 'text':
                            return (
                                <Col key={field.name} md={6} className="mb-3">
                                    <Form.Group controlId={field.name}>
                                        <Form.Label>{field.label}</Form.Label>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className="form-control"
                                            disabled={isView}
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        case 'select':
                            return (
                                <Col key={field.name} md={6} className="mb-3">
                                    <Form.Group controlId={field.name}>
                                        {/*<Form.Label>{field.label}</Form.Label>*/}
                                        <SelectDropdown
                                            id={field.name}
                                            apiUrl={field.apiUrl}
                                            label={field.label}
                                            defaultOption={isEdit || isView ? {
                                                value: formData[field.name],
                                                label: formData[field.name]
                                            } : field.defaultOption}
                                            onChange={(e) => handleChange(e)}
                                            disabled={isView}
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        case 'date':
                            return (
                                <Col key={field.name} md={6} className="mb-3">
                                    <Form.Group controlId={field.name}>
                                        <Form.Label>{field.label}</Form.Label>
                                        <Form.Control
                                            type="date"
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            disabled={isView}
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        case 'number':
                            return (
                                <Col key={field.name} md={6} className="mb-3">
                                    <Form.Group controlId={field.name}>
                                        <Form.Label>{field.label}</Form.Label>
                                        <Form.Control
                                            type="number"
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            disabled={isView}
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        default:
                            return null;
                    }
                })}
            </Row>
            <div className="d-flex justify-content-center">
                <Button variant="secondary" className="me-2" type="button" onClick={onClose}>Close</Button>
                {isView ? <Button variant="primary" type="submit">Edit</Button> :
                    <Button variant="primary" type="submit">Save Changes</Button>}
            </div>
        </Form>
    );
}

FormComponent.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['text', 'select', 'date', 'number']).isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            apiUrl: PropTypes.string,  // Thêm apiUrl cho các trường select
            defaultOption: PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string,
            }),  // Thêm defaultOption cho các trường select
        })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
    idCurrent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
};

export default FormComponent;
