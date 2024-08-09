import React, { useState } from 'react';
import FormInput from '../../../components/FormInputComponents';
import { NumericFormat } from 'react-number-format';

const PositionForm = ({ onSubmit, Position }) => {
  const [formData, setFormData] = useState({
    positionName: '',
    positionID: '',
    departmentType: '',
    status: true,
    startDate: '',
    endDate: '',
    id: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: Array.from(files),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.positionID) {
      newErrors.positionID = 'id Chức vụ không được để trống';
    } else if (formData.positionID.length !== 10) {
      newErrors.positionID = 'id Chức vụ là 10 ký tự';
    } else if (Position.some((pos) => pos.positionID === formData.positionID)) {
      newErrors.positionID = 'id Chức vụ đã tồn tại';
    }

    if (!formData.positionName) {
      newErrors.positionName = 'Tên Chức vụ không được để trống';
    }

    if (!formData.departmentType) {
      newErrors.departmentType = 'Loại tên phòng ban không được để trống';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Ngày bắt đầu không được để trống';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'Ngày kết thúc không được để trống';
    } else if (new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit({
        ...formData,
        status: true,
      });
      setFormData({
        positionName: '',
        positionID: '',
        departmentType: '',
        status: true,
        startDate: '',
        endDate: '',
        id: '',
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Mã Chức vụ"
        type="text"
        name="positionID"
        value={formData.positionID}
        onChange={handleChange}
        error={errors.positionID}
      />
      <div className="form-group">
        <label>Tên Chức Vụ</label>
        <select
          name="positionName"
          value={formData.positionName}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">-- Chọn loại chức vụ --</option>
          <option value="fulltime">Phó Giám Đốc</option>
          <option value="parttime">Phó Phòng</option>
          <option value="freelance">Nhân Viên Marketing</option>
          <option value="intern">Phó Phòng Tài Chính</option>
          <option value="seasonal">Seasonal (Theo mùa vụ)</option>
        </select>
        {errors.positionName && <div className="text-danger">{errors.positionName}</div>}
      </div>
      <div className="form-group">
        <label>Phòng Ban</label>
        <select
          name="departmentType"
          value={formData.departmentType}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">-- Các Phòng Ban --</option>
          <option value="manager"> Giám Đốc</option>
          <option value="supervisor">Trưởng Phòng</option>
          <option value="accountant">Kế toán</option>
          <option value="IT staff">Nhân viên IT</option>
        </select>
        {errors.departmentType && <div className="text-danger">{errors.departmentType}</div>}
      </div>

      <FormInput
        label="Ngày bắt đầu"
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        error={errors.startDate}
      />
      <FormInput
        label="Ngày kết thúc"
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        error={errors.endDate}
      />

      <button type="submit" className="btn btn-primary">Thêm Chức Vụ</button>
    </form>
  );
};

export default PositionForm;
