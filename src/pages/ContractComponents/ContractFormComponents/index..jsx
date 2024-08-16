import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import InputComponents from "../../../components/InputComponents";
import { fetchPersons } from "../ContractService/contractService";

// Component để thêm hợp đồng mới
const ContractForm = ({ onSubmit, contracts }) => {
  const [formData, setFormData] = useState({
    contract_id: "",
    contract_type: "",
    start_date: "",
    end_date: "",
    contract_code: "",
    luongCB: "",
    description: [],
    employee_id: "",
    created_at: "",
    updated_at: "",
  });

  const [errors, setErrors] = useState({});
  const [persons, setPersons] = useState([]);

  // useEffect để thiết lập thời gian hiện tại khi form được tải
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setFormData((prevState) => ({
      ...prevState,
      created_at: now,
      updated_at: now,
    }));

    // Gọi API để lấy danh sách nhân sự
    const loadPersons = async () => {
      try {
        const personsData = await fetchPersons();
        setPersons(personsData);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy danh sách nhân sự!", error);
      }
    };

    loadPersons();
  }, []);

  // Hàm xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const now = new Date().toISOString().slice(0, 16);
    if (name === "description" && files) {
      setFormData({
        ...formData,
        [name]: Array.from(files).map((file) => file.name),
        updated_at: now,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
        updated_at: now,
      });
    }
  };

  // Hàm kiểm tra dữ liệu form
  const validate = () => {
    const newErrors = {};

    //  Kiểm tra mã hợp đồng
    if (!formData.contract_id) {
      newErrors.contract_id = "Mã hợp đồng không được để trống";
    } else if (formData.contract_id.length !== 7) {
      newErrors.contract_id = "Mã hợp đồng phải là 7 ký tự";
    } else if (
      contracts.some(
        (contract) => contract.contract_id === formData.contract_id,
      )
    ) {
      newErrors.contract_id = "Mã hợp đồng đã tồn tại";
    }

    // Kiểm tra mã nhân viên
    if (!formData.employee_id) {
      newErrors.employee_id = "Mã nhân viên không được để trống";
    } else if (!persons.some((person) => person.id === formData.employee_id)) {
      newErrors.employee_id = "Mã nhân viên không tồn tại trong hệ thống";
    }
    // kiểm tra số hợp đồng
    if (!formData.contract_code) {
      newErrors.contract_code = "Mã hợp đồng không được để trống";
    }

    // Kiểm tra loại hợp đồng
    if (!formData.contract_type)
      newErrors.contract_type = "Loại hợp đồng không được để trống";

    // Kiểm tra mức lương
    if (
      !formData.luongCB ||
      isNaN(Number(formData.luongCB.replace(/\./g, ""))) ||
      Number(formData.luongCB.replace(/\./g, "")) <= 0
    )
      newErrors.luongCB = "Mức lương phải là số dương";

    // Kiểm tra ngày bắt đầu
    if (!formData.start_date)
      newErrors.start_date = "Ngày bắt đầu không được để trống";
    // Kiểm tra ngày kết thúc
    if (!formData.end_date)
      newErrors.end_date = "Ngày kết thúc không được để trống";
    if (new Date(formData.start_date) > new Date(formData.end_date))
      newErrors.end_date = "Ngày kết thúc phải sau ngày bắt đầu";

    return newErrors;
  };

  // Hàm xử lý khi form được submit
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
      const now = new Date().toISOString().slice(0, 16);
      setFormData({
        contract_id: "",
        contract_type: "",
        luongCB: "",
        start_date: "",
        end_date: "",
        contract_code: "",
        description: [],
        employee_id: "",
        created_at: now,
        updated_at: now,
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Mã hợp đồng</label>
              <InputComponents
                type="text"
                name="contract_id"
                value={formData.contract_id}
                onChange={handleChange}
                disabled={false}
              />
              {errors.contract_id && (
                <div className="text-danger">{errors.contract_id}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Mã nhân viên</label>
              <InputComponents
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                disabled={false}
              />
              {errors.employee_id && (
                <div className="text-danger">{errors.employee_id}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <InputComponents
                label="Số hợp đồng"
                type="text"
                onChange={handleChange}
                name="contract_code"
                value={formData.contract_code}
              />
            </div>
            {errors.contract_code && (
              <div className="text-danger">{errors.contract_code}</div>
            )}
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Loại hợp đồng</label>
              <select
                name="contract_type"
                value={formData.contract_type}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">-- Chọn loại hợp đồng --</option>
                <option value="fulltime">Hợp đồng lao động chính thức</option>
                <option value="parttime">Hợp đồng lao động parttime</option>
                <option value="freelance">Hợp đồng Freelance</option>
                <option value="probationary">Hợp đồng thử việc</option>
                <option value="intern">Hợp đồng thực tập</option>
              </select>
              {errors.contract_type && (
                <div className="text-danger">{errors.contract_type}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Mức lương</label>
              <NumericFormat
                className="form-control"
                name="luongCB"
                value={formData.luongCB}
                thousandSeparator="."
                decimalSeparator=","
                onValueChange={(values) => {
                  const { value } = values;
                  setFormData({
                    ...formData,
                    luongCB: value,
                    updated_at: new Date().toISOString().slice(0, 16),
                  });
                }}
              />
              {errors.luongCB && (
                <div className="text-danger">{errors.luongCB}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Ngày bắt đầu</label>
              <InputComponents
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
              {errors.start_date && (
                <div className="text-danger">{errors.start_date}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Ngày kết thúc</label>
              <InputComponents
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              />
              {errors.end_date && (
                <div className="text-danger">{errors.end_date}</div>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>Hồ sơ hợp đồng</label>
              <InputComponents
                type="file"
                name="description"
                onChange={handleChange}
                className="form-control"
                multiple // Cho phép chọn nhiều tệp tin
                accept=".doc,.docx,.pdf"
              />
              {formData.description.length > 0 && (
                <ul className="list-group mt-2">
                  {formData.description.map((fileName, index) => (
                    <li key={index} className="list-group-item">
                      {fileName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              Thêm hợp đồng
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContractForm;
