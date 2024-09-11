import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Col, Form, Row } from "react-bootstrap";
import Input from "./InputComponent";

function FormComponent({
  fields,
  onSubmit,
  isEdit,
  idCurrent,
  onClose,
  isView,
}) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    console.log(isView);
    if (isEdit || isView) {
      axios
        .get(
          `https://66ac93a1f009b9d5c7329ca9.mockapi.io/api/hocvien/${idCurrent}`
        )
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [isEdit, idCurrent, isView]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {fields.map((field) => {
          switch (field.type) {
            case "text":
              return (
                <Col key={field.name} md={6} className="mb-3">
                  <Form.Group controlId={field.name}>
                    <Form.Label>{field.label}</Form.Label>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="form-control"
                      disabled={isView}
                    />
                  </Form.Group>
                </Col>
              );
            case "select":
              return (
                <Col key={field.name} md={6} className="mb-3">
                  <Form.Group controlId={field.name}>
                    {/*<Form.Label>{field.label}</Form.Label>*/}
                    
                  </Form.Group>
                </Col>
              );
            case "date":
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
            case "number":
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
        <Button
          variant="secondary"
          className="me-2"
          type="button"
          onClick={onClose}
        >
          Close
        </Button>
        {isView ? (
          <Button variant="primary" type="submit">
            Edit
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        )}
      </div>
    </Form>
  );
}

FormComponent.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["text", "select", "date", "number"]).isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      apiUrl: PropTypes.string, // Add apiUrl for select fields
      defaultOption: PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string,
      }), // Add defaultOption for select fields
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  idCurrent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FormComponent;
