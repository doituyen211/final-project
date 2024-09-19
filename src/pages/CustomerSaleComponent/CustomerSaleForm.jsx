import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {Form as FormikForm, Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Ensure this is correctly imported

const CustomerSaleForm = ({
                              initialData,
                              actionModal,
                              onSubmit,
                              onCancel,
                              programOptions,
                              statusOptions,
                              formFieldsProp
                          }) => {
    // Create validation schema statically
    const validationSchema = Yup.object().shape(
        formFieldsProp.reduce((acc, field) => {
            acc[field.name] = field.validation;
            return acc;
        }, {})
    );

    const [fieldOptions, setFieldOptions] = useState({});

    useEffect(() => {
        const fetchOptions = async (url, fieldName) => {
            try {
                const response = await axios.get(url);
                setFieldOptions(prevOptions => ({
                    ...prevOptions,
                    [fieldName]: Array.isArray(response.data.data) ? response.data.data : [] // Ensure it's an array
                }));
            } catch (error) {
                console.error(`Error fetching options for ${fieldName}:`, error);
                setFieldOptions(prevOptions => ({
                    ...prevOptions,
                    [fieldName]: [] // Default to an empty array on error
                }));
            }
        };

        formFieldsProp.forEach(field => {
            if (field.type === 'select' && field.apiUrl) {
                fetchOptions(field.apiUrl, field.name);
            }
        });
    }, [formFieldsProp]);

    return (
        <Formik
            initialValues={initialData}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true} // Add this line to enable reinitialization
        >
            {({handleChange, values, errors, touched}) => (
                <FormikForm>
                    <Row>
                        {formFieldsProp.map((field, index) => {
                            const {name, label, type, placeholder, defaultOption} = field;
                            const options = fieldOptions[name] || []; // Get options for the field

                            return (
                                <Col md={6} className='mb-3' key={index}>
                                    <Form.Group controlId={name}>
                                        <Form.Label>{label}</Form.Label>
                                        {type === 'select' ? (
                                            <Form.Control
                                                as="select"
                                                name={name}
                                                value={values[name] || ''}
                                                onChange={handleChange}
                                                disabled={actionModal === 'VIEW'}
                                            >
                                                <option value="">
                                                    {defaultOption?.label || 'Select an option'}
                                                </option>
                                                {Array.isArray(options) && options.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        ) : type === 'checkbox' ? (
                                            Array.isArray(options) && options.map(option => (
                                                <Form.Check
                                                    key={option.id}
                                                    type="checkbox"
                                                    id={`checkbox-${option.id}`}
                                                    name={name}
                                                    value={option.id}
                                                    label={option.name}
                                                    checked={values[name]?.includes(option.id)}
                                                    onChange={handleChange}
                                                    disabled={actionModal === 'VIEW'}
                                                />
                                            ))
                                        ) : (
                                            <Form.Control
                                                type={type}
                                                name={name}
                                                value={values[name] || ''}
                                                onChange={handleChange}
                                                placeholder={placeholder}
                                                disabled={actionModal === 'VIEW'}
                                            />
                                        )}
                                        {errors[name] && touched[name] ? (
                                            <div className="text-danger">{errors[name]}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            );
                        })}
                    </Row>
                    <div className="d-flex justify-content-center">
                        <Button variant="secondary" className="me-2" type="button" onClick={onCancel}>
                            Huỷ bỏ
                        </Button>
                        {actionModal === 'VIEW' ? (
                            <Button variant="primary" type="button">
                                Chỉnh sửa
                            </Button>
                        ) : (
                            <Button variant="primary" type="submit">
                                Lưu lại
                            </Button>
                        )}
                    </div>
                </FormikForm>
            )}
        </Formik>
    );
};

export default CustomerSaleForm;
