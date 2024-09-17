import React from "react";
import { Modal } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import InputComponents from "../../../components/InputComponents";
import ButtonComponents from "../../../components/ButtonComponents";

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} / ${day}-${month}-${year}`;
};
const contractTypeMap = {
  fulltime: "Hợp đồng lao động chính thức",
  parttime: "Hợp đồng lao động parttime",
  freelance: "Hợp đồng Freelance",
  probationary: "Hợp đồng thử việc",
  intern: "Hợp đồng thực tập",
};
const ContractViewComponents = ({ show, handleClose, contract }) => {
  if (!contract) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết hợp đồng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Mã nhân viên"
                  type="text"
                  name="employeeId"
                  value={contract.employee_id}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Mã hợp đồng"
                  type="text"
                  name="contract_id"
                  value={contract.contract_id}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Số hợp đồng"
                  type="text"
                  name="contract_id"
                  value={contract.contract_code}
                  disabled
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Loại hợp đồng"
                  type="text"
                  name="contractType"
                  value={contractTypeMap[contract.contract_type] || ""}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Mức lương</label>
                <NumericFormat
                  value={contract.luongCB}
                  displayType={"text"}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix=""
                  className="form-control"
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Ngày bắt đầu"
                  type="text"
                  name="startDate"
                  value={contract.start_date}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Ngày kết thúc"
                  type="text"
                  name="endDate"
                  value={contract.end_date}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Ngày tạo"
                  type="text"
                  name="created_at"
                  value={formatDateTime(contract.created_at)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Ngày cập nhật"
                  type="text"
                  name="updated_at"
                  value={formatDateTime(contract.updated_at)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <InputComponents
                  label="Trạng thái"
                  type="text"
                  name="status"
                  value={contract.status ? "Active" : "Inactive"}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Hồ sơ hợp đồng</label>
            <p>Có {contract.description.length} hồ sơ</p>
            {contract.description && contract.description.length > 0 ? (
              <ul className="list-group mt-2">
                {contract.description.map((file, index) => (
                  <li key={index} className="list-group-item">
                    <a href={file.url} download={file.name}>
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Chưa có hồ sơ hợp đồng</p>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <ButtonComponents
          variant="secondary"
          onClick={handleClose}
          className="btn btn-danger"
        >
          Đóng
        </ButtonComponents>
      </Modal.Footer>
    </Modal>
  );
};

export default ContractViewComponents;
