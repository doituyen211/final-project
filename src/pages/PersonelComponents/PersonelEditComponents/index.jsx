import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap'; // Sử dụng React-Bootstrap
import InputComponents from "../../../components/InputComponents";

const PersonnelEditComponent = ({show, handleClose, personnel, onSave}) => {

    const [formData, setFormData] = useState({
        id: '',
        positionId: '',
        allowanceId: '',
        qualificationId: '',
        contractId: '',
        employeeId: '',
        employeeName: '',
        positionName: '',
        departmentName: '',
        contractName: '',
        date: '',
        address: '',
        gender: '',
        email: '',
        phoneNumber: '',
        CCCD: '',
        qualificationName: '',
        status: true,
        image: [],
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (personnel) {
            setFormData({
                id: personnel.id || '',
                positionId: personnel.positionId || '',
                allowanceId: personnel.allowanceId || '',
                qualificationId: personnel.qualificationId || '',
                contractId: personnel.contractId || '',
                employeeId: personnel.employeeId || '',
                employeeName: personnel.employeeName || '',
                positionName: personnel.positionName || '',
                departmentName: personnel.departmentName || '',
                date: personnel.date || '',
                address: personnel.address || '',
                gender: personnel.gender || '',
                email: personnel.email || '',
                phoneNumber: personnel.phoneNumber || '',
                CCCD: personnel.CCCD || '',
                contractName: personnel.contractName || '',
                qualificationName: personnel.qualificationName || '',
                status: personnel.status || false,
                image: personnel.image || [],
                startDate: personnel.startDate || '',
                endDate: personnel.endDate || ''
            });
        }
    }, [personnel]);

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: Array.from(files)
            });
        } else if (name === "status") {
            setFormData({
                ...formData,
                [name]: value === "true" // Chuyển đổi chuỗi thành boolean
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSave = () => {
        onSave(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thông tin nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Mã nhân viên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Tên nhân viên</label>
                            <input
                                type="text"
                                className="form-control"
                                name="employeeName"
                                value={formData.employeeName}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Giới tính</label>
                            <input
                                type="text"
                                className="form-control"
                                name="employeeName"
                                value={formData.gender}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày sinh</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Chức vụ</label>
                            <input
                                type="text"
                                className="form-control"
                                name="positionName"
                                value={formData.positionName}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Phòng ban</label>
                            <input
                                type="text"
                                className="form-control"
                                name="departmentName"
                                value={formData.departmentName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>CCCD</label>
                            <input
                                type="text"
                                name="CCCD"
                                className="form-control"
                                value={formData.CCCD}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Bằng cấp</label>
                            <input
                                type="text"
                                className="form-control"
                                name="qualificationName"
                                value={formData.qualificationName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Hợp đồng</label>
                            <input
                                type="text"
                                className="form-control"
                                name="contractName"
                                value={formData.contractName}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày bắt đầu</label>
                            <InputComponents
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                placeholder=""
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày kết thúc</label>
                            <InputComponents
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                placeholder=""
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value={true}>Hoạt động</option>
                                <option value={false}>Không hoạt động</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Image</label>
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                onChange={handleChange}
                                multiple
                            />
                            {Array.isArray(formData.image) && formData.image.length > 0 && (
                                <div>
                                    {formData.image.map((file, index) => (
                                        <div key={index}>{file.name}</div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Lưu thay đổi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PersonnelEditComponent;
