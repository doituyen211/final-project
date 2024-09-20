import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Row } from "react-bootstrap";

function FormComponent({
  fields,
  onSubmit,
  formData: initialFormData = {}, // Ensure formData is initialized with an empty object
  isEdit,
  onClose,
  isView,
}) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  // Update formData when initialFormData changes (e.g., in edit/view mode)
  useEffect(() => {
    if (initialFormData) {
      setFormData((prev) => ({
        ...prev,
        ...initialFormData, // Merge existing form data with the initial data
      }));
    }
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Submit the form data
  };

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
                    <Form.Control
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      disabled={isView} // Disable the field in view mode
                    />
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
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      disabled={isView} // Disable the field in view mode
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
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      disabled={isView} // Disable the field in view mode
                    />
                  </Form.Group>
                </Col>
              );
            case "select":
              return (
                <Col key={field.name} md={6} className="mb-3">
                  <Form.Group controlId={field.name}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                      as="select"
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      disabled={isView} // Disable the field in view mode
                    >
                      <option value="">
                        {field.defaultOption?.label || "Select an option"}
                      </option>
                      {field.options &&
                        field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              );
            default:
              return null;
          }
        })}
      </Row>
      <div className="d-flex justify-content-center">
        
        {!isView && (
          <Button variant="primary" type="submit">
            {isEdit ? "Save Changes" : "Submit"}
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
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object, // Allow formData to be passed in
  isEdit: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isView: PropTypes.bool.isRequired,
};

export default FormComponent;
