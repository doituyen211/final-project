import React, { useState, useEffect } from "react";

const FormComponent = ({ fields, onFormSubmit, isEditing, onEditClick }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value || "";
      return acc;
    }, {})
  );

  useEffect(() => {
    setFormData(
      fields.reduce((acc, field) => {
        acc[field.name] = field.value || "";
        return acc;
      }, {})
    );
  }, [fields]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFormSubmit) {
      onFormSubmit(formData);
      onEditClick(false); // Exit edit mode after form submission
    }
  };

  const handleCancel = () => {
    setFormData(
      fields.reduce((acc, field) => {
        acc[field.name] = field.value || "";
        return acc;
      }, {})
    );
    if (onEditClick) {
      onEditClick(false); // Exit edit mode on cancel
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index} className="form-group">
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            readOnly={!isEditing || field.name === "ma_hoc_vien" || field.name === "Id_ctdd"}
            className="form-control"
          />
        </div>
      ))}

      {isEditing ? (
        <>
          <button type="submit" className="btn btn-primary">
            Lưu lại
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={handleCancel}
          >
            Đóng
          </button>
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onEditClick(true)}
        >
          Chỉnh sửa
        </button>
      )}
    </form>
  );
};

export default FormComponent;

