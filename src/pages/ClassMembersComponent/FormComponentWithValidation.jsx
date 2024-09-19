import React, {useEffect, useState} from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import axios from "axios"; // Ensure this is correctly imported

const FormComponentWithValidation = ({ initialData, actionModal, onSubmit, onCancel, programOptions, statusOptions , formFieldsProp}) => {
    // Create validation schema statically
    const validationSchema = Yup.object().shape(
        formFieldsProp.reduce((acc, field) => {
            acc[field.name] = field.validation;
            return acc;
        }, {})
    );

    const [fieldOptions, setFieldOptions] = useState({});

    useEffect(() => {
        console.log("Get Option Select ")
        const fetchOptions = async (url, fieldName) => {
            try {
                const response = await axios.get(url);
                setFieldOptions(prevOptions => ({
                    ...prevOptions,
                    [fieldName]: response.data
                }));
            } catch (error) {
                console.error(`Error fetching options for ${fieldName}:`, error);
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
            {({ handleChange, values, errors, touched }) => (
                <FormikForm>
                    <h3 className="text-start mb-4">{actionModal === "EDIT" ? "Cập Nhật" : "Thêm Mới"}</h3>
                    <Row>
                        {formFieldsProp.map((field, index) => {
                            const { name, label, type,placeholder, defaultOption,apiUrl } = field;
                            const options = fieldOptions[name] || []; // Get options for the field

                            return (
                                <Col md={12} className='mb-3' key={index}>
                                    <Form.Group controlId={name}>
                                        <Form.Label>{label}</Form.Label>
                                        {type === 'select' ? (
                                            <Form.Control
                                                as="select"
                                                name={name}
                                                value={values[name] || ''}
                                                onChange={handleChange}
                                                disabled={actionModal === "VIEW"}
                                                >
                                                <option value="">{defaultOption?.label || "Select an option"}</option>
                                                <option value="2">Hoàn thành</option>
                                                <option value="1">Đang học</option>
                                            </Form.Control>

                                        ) : (
                                            // <Input
                                            //     type={type}
                                            //     name={name}
                                            //     value={values[name] || ''}
                                            //     onChange={handleChange}
                                            //     placeholder={placeholder}
                                            //     className="form-control"
                                            //     disabled={actionModal === "VIEW"}
                                            // />
                                            <Form.Control
                                                type={type}
                                                name={name}
                                                value={values[name] || ''}
                                                onChange={handleChange}
                                                placeholder={placeholder}
                                                disabled={actionModal === "VIEW"}
                                            />
                                        )}
                                        {errors[name] && touched[name] ? (
                                            <div className="text-danger">{errors[name]}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            );
                        })}
                        {/*<Col md={6} className='mb-3'>*/}
                        {/*    <Form.Group controlId="subject_name">*/}
                        {/*        <Form.Label>Tên môn học</Form.Label>*/}
                        {/*        <Input*/}
                        {/*            type="text"*/}
                        {/*            name="subject_name"*/}
                        {/*            value={values.subject_name || ''}*/}
                        {/*            onChange={handleChange}*/}
                        {/*            placeholder="Nhập tên môn học"*/}
                        {/*            className="form-control"*/}
                        {/*            disabled={actionModal === "VIEW"}*/}
                        {/*        />*/}
                        {/*        {errors.subject_name && touched.subject_name ? (*/}
                        {/*            <div className="text-danger">{errors.subject_name}</div>*/}
                        {/*        ) : null}*/}
                        {/*    </Form.Group>*/}
                        {/*</Col>*/}
                        {/*<Col md={6} className='mb-3'>*/}
                        {/*    <Form.Group controlId="training_duration">*/}
                        {/*        <Form.Label>Thời lượng</Form.Label>*/}
                        {/*        <Input*/}
                        {/*            type="number"*/}
                        {/*            name="training_duration"*/}
                        {/*            value={values.training_duration || ''}*/}
                        {/*            onChange={handleChange}*/}
                        {/*            placeholder="Nhập thời lượng"*/}
                        {/*            className="form-control"*/}
                        {/*            disabled={actionModal === "VIEW"}*/}
                        {/*        />*/}
                        {/*        {errors.training_duration && touched.training_duration ? (*/}
                        {/*            <div className="text-danger">{errors.training_duration}</div>*/}
                        {/*        ) : null}*/}
                        {/*    </Form.Group>*/}
                        {/*</Col>*/}
                        {/*<Col md={6} className='mb-3'>*/}
                        {/*    <Form.Group controlId="training_program_id">*/}
                        {/*        <Form.Label>Chương trình đào tạo</Form.Label>*/}
                        {/*        <Form.Control*/}
                        {/*            as="select"*/}
                        {/*            name="training_program_id"*/}
                        {/*            value={values.training_program_id || ''}*/}
                        {/*            onChange={handleChange}*/}
                        {/*            disabled={actionModal === "VIEW"}*/}
                        {/*        >*/}
                        {/*            <option value="">Chọn chương trình đào tạo</option>*/}
                        {/*            {programOptions.map(option => (*/}
                        {/*                <option key={option.value} value={option.id}>*/}
                        {/*                    {option.name}*/}
                        {/*                </option>*/}
                        {/*            ))}*/}
                        {/*        </Form.Control>*/}
                        {/*        {errors.training_program_id && touched.training_program_id ? (*/}
                        {/*            <div className="text-danger">{errors.training_program_id}</div>*/}
                        {/*        ) : null}*/}
                        {/*    </Form.Group>*/}
                        {/*</Col>*/}
                        {/*<Col md={6} className='mb-3'>*/}
                        {/*    <Form.Group controlId="status">*/}
                        {/*        <Form.Label>Trạng thái</Form.Label>*/}
                        {/*        <Form.Control*/}
                        {/*            as="select"*/}
                        {/*            name="status"*/}
                        {/*            value={values.status || ''}*/}
                        {/*            onChange={handleChange}*/}
                        {/*            disabled={actionModal === "VIEW"}*/}
                        {/*        >*/}
                        {/*            <option value="">Chọn trạng thái</option>*/}
                        {/*            {statusOptions.map(option => (*/}
                        {/*                <option key={option.value} value={option.id}>*/}
                        {/*                    {option.name}*/}
                        {/*                </option>*/}
                        {/*            ))}*/}
                        {/*        </Form.Control>*/}
                        {/*        {errors.status && touched.status ? (*/}
                        {/*            <div className="text-danger">{errors.status}</div>*/}
                        {/*        ) : null}*/}
                        {/*    </Form.Group>*/}
                        {/*</Col>*/}
                    </Row>
                    <div className="d-flex justify-content-center">
                        <Button variant="secondary" className="me-2" type="button" onClick={onCancel}>Huỷ bỏ</Button>
                        {actionModal === 'VIEW'
                            ? <Button variant="primary" type="button">Chỉnh sửa</Button>
                            : <Button variant="primary" type="submit">Lưu lại</Button>
                        }
                    </div>
                </FormikForm>
            )}
        </Formik>
    );
};

export default FormComponentWithValidation;
