import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import InputComponents from "../../../components/InputComponents";
import ButtonComponents from "../../../components/ButtonComponents";
// Component để chỉnh sửa hợp đồng
const ContractEditComponents = ({ show, handleClose, contract, onSave }) => {
  // Khởi tạo state cho dữ liệu form
  const [formData, setFormData] = useState({
    id: "",
    employee_id: "",
    contract_id: "",
    contract_code: "",
    contract_type: "",
    luongCB: "",
    start_date: "",
    end_date: "",
    status: 1,
    description: [],
    updated_at: "",
  });

  // Khởi tạo state cho lưu trữ các lỗi
  const [errors, setErrors] = useState({});

  // useEffect để cập nhật dữ liệu form khi contract thay đổi
  useEffect(() => {
    if (contract) {
      setFormData({
        id: contract.id || "",
        employee_id: contract.employee_id || "",
        contract_type: contract.contract_type || "",
        contract_id: contract.contract_id || "",
        contract_code: contract.contract_code || "",
        luongCB: contract.luongCB || "",
        start_date: contract.start_date || "",
        end_date: contract.end_date || "",
        status: contract.status || 0,
        description: contract.description || [],
        updated_at: contract.updated_at || "",
      });
    }
  }, [contract]);

  // Hàm xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: Array.from(files),
      });
    } else if (name === "status") {
      setFormData({
        ...formData,
        [name]: value === "true", // Chuyển đổi giá trị chuỗi thành boolean
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Hàm xử lý khi nhấn nút lưu
  const handleSave = (e) => {
    e.preventDefault();

    // Gọi hàm validate để kiểm tra các lỗi trong form
    const errors = validateFormEdit();

    if (Object.keys(errors).length > 0) {
      // Nếu có lỗi, cập nhật state để hiển thị lỗi
      setErrors(errors);
    } else {
      const updatedContract = {
        ...formData,
        updated_at: new Date().toISOString(), // Cập nhật thời gian
      };
      // console.log("Hợp đồng đã cập nhật:", updatedContract);
      onSave(updatedContract);
      handleClose();
      setErrors({});
    }
  };

  // Hàm kiểm tra dữ liệu edit Contract
  const validateFormEdit = () => {
    const newErrors = {};

    // Kiểm tra mã loại hợp đồng
    if (!formData.contract_type) {
      newErrors.contract_type = "Loại hợp đồng không được để trống";
    }
    // Kiểm tra mức lương
    if (!formData.luongCB || parseFloat(formData.luongCB) <= 0) {
      newErrors.luongCB = "Mức lương không hợp lệ";
    }

    return newErrors;
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa hợp đồng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Mã nhân viên"
                  type="text"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleChange}
                  placeholder=""
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Mã hợp đồng"
                  type="text"
                  onChange={handleChange}
                  name="contract_id"
                  value={formData.contract_id}
                  placeholder=""
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label=" Số hợp đồng"
                  type="text"
                  onChange={handleChange}
                  name="contract_code"
                  value={formData.contract_code}
                  placeholder=""
                  disabled
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Loại hợp đồng</label>
                <select
                  name="contract_type"
                  value={formData.contract_type}
                  onChange={handleChange}
                  className="form-control"
                >
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
            <div className="col-md-6">
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
                      luongCB: parseFloat(value),
                    });
                  }}
                  // isNumericString
                />
                {errors.luongCB && (
                  <div className="text-danger">{errors.luongCB}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Ngày bắt đầu"
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Ngày kết thúc"
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Trạng thái</label>
                <select
                  name="status"
                  value={formData.status ? "true" : "false"}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="true">Active</option>
                  <option value="false">Disable</option>
                </select>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label>Có {formData.description.length} hồ sơ</label>
                {formData.description.length > 0 && (
                  <ul className="list-group mt-2">
                    {formData.description.map((file, index) => (
                      <li key={index} className="list-group-item">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                )}
                <InputComponents
                  label="Hồ sơ hợp đồng (.doc, .pdf)"
                  type="file"
                  name="description"
                  onChange={handleChange}
                  multiple
                  accept=".doc,.pdf"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonComponents
          className="custom-button btn btn-danger"
          variant="secondary"
          onClick={handleClose}
        >
          Đóng
        </ButtonComponents>
        <ButtonComponents
          className="custom-button btn btn-success"
          variant="primary"
          onClick={handleSave}
        >
          Lưu thay đổi
        </ButtonComponents>
      </Modal.Footer>
    </Modal>
  );
};

export default ContractEditComponents;
