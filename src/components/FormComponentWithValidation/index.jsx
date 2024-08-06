import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Input from '../InputComponents';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useFormik } from 'formik';
import * as Yup from 'yup';

function FormComponentWithValidation(props) {
    const { fields, getData, action, idCurrent, onClose, api, title, dataForm } = props;

    // Function to create validation schema
    const createValidationSchema = (fields) => {
        const shape = {};
        fields.forEach(field => {
            if (field.validation) {
                shape[field.name] = field.validation;
            }
        });
        return Yup.object().shape(shape);
    };

    const validationSchema = createValidationSchema(fields);

    const formik = useFormik({
        initialValues: dataForm,
        validationSchema,
        onSubmit: async (values) => {
            try {
                const url = action === 'EDIT' ? `${api}/${idCurrent}` : api;
                const method = action === 'EDIT' ? axios.put : axios.post;
                await method(url, values);
                onClose();
                getData();
                toast.success(`${action === 'EDIT' ? 'Updated' : 'Created'} successfully!`);
            } catch (error) {
                console.error(`Error ${action.toLowerCase()} item:`, error);
                toast.error(`Failed to ${action.toLowerCase()} item.`);
            }
        },
    });

    const [selectOptions, setSelectOptions] = useState({});
    useEffect(() => {
        fields.forEach(field => {
            if (field.type === 'select' && field.apiUrl) {
                axios.get(field.apiUrl)
                    .then(res => setSelectOptions(prev => ({...prev, [field.name]: res.data})))
                    .catch(err => console.error('Error fetching select options:', err));
            }
        });
    }, [fields]);

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
                                value={formik.values[field.name] || ''}
                                onChange={formik.handleChange}
                                placeholder={field.placeholder}
                                className="form-control"
                                disabled={action === 'VIEW'}
                            />
                            {formik.errors[field.name] && formik.touched[field.name] && (
                                <div className="text-danger">{formik.errors[field.name]}</div>
                            )}
                        </Form.Group>
                    </Col>
                );
            case 'select':
                return (
                    <Col {...commonProps}>
                        <Form.Group controlId={field.name}>
                            <Form.Label>{field.label}</Form.Label>
                            <Form.Select
                                id={field.name}
                                name={field.name}
                                value={formik.values[field.name] || ''}
                                onChange={formik.handleChange}
                                disabled={action === 'VIEW'}
                            >
                                {field.defaultOption && (
                                    <option value={field.defaultOption.value}>
                                        {field.defaultOption.label}
                                    </option>
                                )}
                                {field.apiUrl && selectOptions[field.name] && selectOptions[field.name].map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </Form.Select>
                            {formik.errors[field.name] && formik.touched[field.name] && (
                                <div className="text-danger">{formik.errors[field.name]}</div>
                            )}
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
                                value={formik.values[field.name] || ''}
                                onChange={formik.handleChange}
                                disabled={action === 'VIEW'}
                            />
                            {formik.errors[field.name] && formik.touched[field.name] && (
                                <div className="text-danger">{formik.errors[field.name]}</div>
                            )}
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
                                value={formik.values[field.name] || ''}
                                onChange={formik.handleChange}
                                placeholder={field.placeholder}
                                disabled={action === 'VIEW'}
                            />
                            {formik.errors[field.name] && formik.touched[field.name] && (
                                <div className="text-danger">{formik.errors[field.name]}</div>
                            )}
                        </Form.Group>
                    </Col>
                );
            default:
                return null;
        }
    };

    return (
        <Form onSubmit={formik.handleSubmit}>
            <h3 className="text-start mb-4">{title}</h3>
            <Row>
                {fields.map(renderField)}
            </Row>
            <div className="d-flex justify-content-center">
                <Button variant="secondary" className="me-2" type="button" onClick={() => {
                    formik.resetForm();
                    onClose();
                }}>Cancel</Button>
                {action === 'VIEW'
                    ? <Button variant="primary" type="button">Edit</Button>
                    : <Button variant="primary" type="submit">Save</Button>
                }
            </div>
            <ToastContainer />
        </Form>
    );
}

FormComponentWithValidation.defaultProps = {
    action: 'CREATE',
    onClose: () => {},
};

FormComponentWithValidation.propTypes = {
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
            validation: PropTypes.object,
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
    title: PropTypes.string.isRequired,
    dataForm: PropTypes.object,
};

export default FormComponentWithValidation;
