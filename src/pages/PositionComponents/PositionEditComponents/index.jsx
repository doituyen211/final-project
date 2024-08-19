// src/components/EditPositionModal.js
import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {NumericFormat} from 'react-number-format';

const PositionEditComponents = ({show, handleClose, position, onSave}) => {
    const [formData, setFormData] = useState({
        positionName : '',
        positionID: '',
        departmentType: '',
        status: true,
        startDate: '',
        endDate: '',
        id: '',

    });

    useEffect(() => {
        if (position) {
            setFormData({
                positionName: position.Position_Name || '',
                positionID: position.IDchucvu || '',
                departmentType: position.departmentType || '',
                status: position.status || false,
                startDate: position.startDate || '',
                endDate: position.endDate || '',
                id : position.id || '',
            });
        }
    }, [position]);

    const handleChange = (e) => {
        const {name, value, files, type, checked} = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: Array.from(files)
            });
        } else if (name === 'status') {
            // Chuyển đổi giá trị chuỗi thành boolean
            setFormData({
                ...formData,
                [name]: value === 'true'
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSave = () => {
        const updatedPosition = {
            ...formData,
            id: position.ID
        };
        console.log('Hợp đồng đã cập nhật:', updatedPosition); // Kiểm tra dữ liệu đã cập nhật
        onSave(updatedPosition);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa Chức Vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>id Chức Vụ</label>
                    <input
                        type="text"
                        className="form-control"
                        name="positionId"
                        value={formData.positionID}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Tên Chức Vụ</label>
                    <select
                        name="positionName"
                        value={formData.positionName}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="giám đốc">giám đốc</option>
                        <option value="Trưởng Phòng">Trưởng Phòng</option>
                        <option value="nhân viên  chính thức">nhân viên  chính thức</option>
                        <option value="nhân viên  thử việc">nhân viên  thử việc</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Phòng Ban</label>
                    <select
                        name="departmentType"
                        value={formData.departmentType}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="Quản lý">CHỨC VỤ QUẢN LÝ</option>
                        <option value="Kế Toán">CHỨC VỤ KẾ TOÁN</option>
                        <option value="Nhân viên IT">CHỨC VỤ NHÂN VIÊN IT</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Ngày bắt đầu</label>
                    <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={formData.startDate}
                        onChange={handleChange}
                        disabled 
                    /> 
                </div>
                <div className="form-group">
                    <label>Ngày kết thúc</label>
                    <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Trạng thái</label>
                    <select
                        name="status"
                        value={formData.status.toString()} // Chuyển boolean thành chuỗi cho select
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
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


export default PositionEditComponents;
