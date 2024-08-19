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
      onEditClick(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index} className="form-group">
          <label>{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              readOnly={!isEditing || field.name === "ma_hoc_vien" || field.name === "Id_ctdd"}
              className="form-control"
            />
          )}
          {field.type === "date" && (
            <input
              type="date"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              readOnly={!isEditing}
              className="form-control"
            />
          )}
          {field.type === "checkbox_group" && (
            <div>
              {field.options.map((option, idx) => (
                <label key={idx} className="mr-3">
                  <input
                    type="checkbox"
                    name={option.value}
                    checked={formData[option.value] || false}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}
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
