import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SelectDropdown from '../SelectDownButton';
import axios from 'axios';
import {Button, Col, Form, Row} from 'react-bootstrap';
import Input from '../InputComponents';

function FormComponent(props) {
    const {fields, getData, action, idCurrent, onClose, api} = props;

    const [formData, setFormData] = useState(() =>
        fields.reduce((acc, field) => ({...acc, [field.name]: ''}), {})
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = action === 'EDIT' ? `${api}/${formData.id}` : api;
            const method = action === 'EDIT' ? axios.put : axios.post;
            await method(url, formData);
            onClose();
            getData();
        } catch (error) {
            console.error(`Error ${action.toLowerCase()} item:`, error);
        }
    };

    useEffect(() => {
        if (action === 'EDIT' || action === 'VIEW') {
            axios.get(`${api}/${idCurrent}`)
                .then(res => setFormData(res.data))
                .catch(err => console.error('Error fetching data:', err));
        }
    }, [action, idCurrent, api]);

    const renderField = (field) => {
        const commonProps = {
            key: field.name,
            md: 6,
            className: 'mb-3'
        };

        switch (field.type) {
            case 'text':
                return (
                    <Col {...commonProps}>
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
                                disabled={action === 'VIEW'}
                            />
                        </Form.Group>
                    </Col>
                );
            case 'select':
                return (
                    <Col {...commonProps}>
                        <Form.Group controlId={field.name}>
                            <SelectDropdown
                                id={field.name}
                                apiUrl={field.apiUrl}
                                label={field.label}
                                defaultOption={action === 'EDIT' || action === 'VIEW' ? {
                                    value: formData[field.name],
                                    label: formData[field.name]
                                } : field.defaultOption}
                                onChange={handleChange}
                                disabled={action === 'VIEW'}
                            />
                        </Form.Group>
                    </Col>
                );
            case 'date':
                return (
                    <Col {...commonProps}>
                        <Form.Group controlId={field.name}>
                            <Form.Label>{field.label}</Form.Label>
                            <Form.Control
                                type="date"
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                disabled={action === 'VIEW'}
                            />
                        </Form.Group>
                    </Col>
                );
            case 'number':
                return (
                    <Col {...commonProps}>
                        <Form.Group controlId={field.name}>
                            <Form.Label>{field.label}</Form.Label>
                            <Form.Control
                                type="number"
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                disabled={action === 'VIEW'}
                            />
                        </Form.Group>
                    </Col>
                );
            default:
                return null;
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                {fields.map(renderField)}
            </Row>
            <div className="d-flex justify-content-center">
                <Button variant="secondary" className="me-2" type="button" onClick={onClose}>Close</Button>
                {action === 'VIEW'
                    ? <Button variant="primary" type="button">Edit</Button>
                    : <Button variant="primary" type="submit">Save Changes</Button>
                }
            </div>
        </Form>
    );
}

FormComponent.defaultProps = {
    action: 'CREATE',
    onClose: () => {
    },
};

FormComponent.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['text', 'select', 'date', 'number']).isRequired,
            label: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            apiUrl: PropTypes.string,
            defaultOption: PropTypes.shape({
                value: PropTypes.string.isRequired,
                label: PropTypes.string,
            }),
        })
    ).isRequired,
    getData: PropTypes.func.isRequired,
    action: PropTypes.oneOf(['CREATE', 'EDIT', 'VIEW']),
    idCurrent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onClose: PropTypes.func,
    api: PropTypes.string.isRequired,
};

export default FormComponent;
