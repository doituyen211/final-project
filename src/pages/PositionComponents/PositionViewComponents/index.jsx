// src/components/ViewpositionModal.js
import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {NumericFormat} from 'react-number-format';

const PositionViewComponents = ({show, handleClose, position}) => {
    if (!position) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết chức vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>ID chức vụ</label>
                    <input
                        type="text"
                        className="form-control"
                        value={position.IDchucvu}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Tên Chức Vụ</label>
                    <input
                        type="text"
                        className="form-control"
                        value={position.Position_Name}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Loại Phòng Ban</label>
                    <input
                        type="text"
                        className="form-control"
                        value={position.departmentType}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Ngày bắt đầu</label>
                    <input
                        type="text"
                        className="form-control"
                        value={position.startDate}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Ngày kết thúc</label>
                    <input
                        type="text"
                        className="form-control"
                        value={position.endDate}
                        disabled
                    />
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PositionViewComponents;
