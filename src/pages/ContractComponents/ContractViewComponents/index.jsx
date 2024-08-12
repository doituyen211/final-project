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
                  value={contract.employeeId}
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
                  value={contract.contractType}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Mức lương</label>
                <NumericFormat
                  value={contract.salary}
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
                  value={contract.startDate}
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
                  value={contract.endDate}
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
            {contract.files && contract.files.length > 0 ? (
              <ul className="list-group mt-2">
                {contract.files.map((file, index) => (
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
        <ButtonComponents variant="secondary" onClick={handleClose}>
          Đóng
        </ButtonComponents>
      </Modal.Footer>
    </Modal>
  );
};

export default ContractViewComponents;
