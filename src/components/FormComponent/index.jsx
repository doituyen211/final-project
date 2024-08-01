import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from "../SelectDownButton";
import axios from "axios";
import Input from "../InputComponents";
import {Button, Col, Form, Row} from "react-bootstrap";

function FormComponent({fields, onSubmit, isEdit, idCurrent}) {
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
        if (isEdit) {
            axios.get(`https://66aa0b5b613eced4eba7559a.mockapi.io/subject/${idCurrent}`)
                .then((res) => {
                    setFormData(res.data);
                })
                .catch((err) => {
                    console.error("Error fetching data:", err);
                });
        }
    }, [isEdit, idCurrent]);

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
                                            defaultOption={field.defaultOption}
                                            onChange={(e) => handleChange(e)}
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
                                        />
                                    </Form.Group>
                                </Col>
                            );
                        default:
                            return null;
                    }
                })}
            </Row>
            <Button variant="secondary" className="me-2" type="button">Close</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
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
            apiUrl: PropTypes.string,  // Add apiUrl for select fields
            defaultOption: PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string,
            }),  // Add defaultOption for select fields
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
