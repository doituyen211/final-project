import React from 'react';
import {Modal} from 'react-bootstrap';
import {NumericFormat} from 'react-number-format';
import InputComponents from "../../../components/InputComponents";
import ButtonComponents from "../../../components/ButtonComponents";

const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} / ${day}-${month}-${year}`;
};

const ContractViewComponents = ({show, handleClose, contract}) => {
    if (!contract) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết hợp đồng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>Mã nhân viên</label>
                    <InputComponents
                        type="text"
                        name="employeeId"
                        value={contract.employeeId}
                        onChange={() => {}}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Loại hợp đồng</label>
                    <InputComponents
                        type="text"
                        name="contractType"
                        value={contract.contractType}
                        onChange={() => {}}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Mức lương</label>
                    <NumericFormat
                        value={contract.salary}
                        displayType={'text'}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix=""
                        className="form-control"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Ngày bắt đầu</label>
                    <InputComponents
                        type="text"
                        name="startDate"
                        value={contract.startDate}
                        onChange={() => {}}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Ngày kết thúc</label>
                    <InputComponents
                        type="text"
                        name="endDate"
                        value={contract.endDate}
                        onChange={() => {}}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Ngày tạo</label>
                    <InputComponents
                        type="text"
                        name="created_at"
                        value={formatDateTime(contract.created_at)}
                        onChange={() => {}}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Ngày cập nhật</label>
                    <InputComponents
                        type="text"
                        name="updated_at"
                        value={formatDateTime(contract.updated_at)}
                        onChange={() => {}}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Trạng thái</label>
                    <InputComponents
                        type="text"
                        name="status"
                        value={contract.status ? 'Active' : 'Inactive'}
                        onChange={() => {}}
                        disabled
                    />
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
