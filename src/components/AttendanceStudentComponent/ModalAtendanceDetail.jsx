import React, { useState } from 'react';
import { Modal, Button, Table, Row, Col } from 'react-bootstrap';

const ModalAttendanceDetail = ({ show, handleClose, attendanceData, dataDetail }) => {
    console.log(attendanceData);
    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" aria-labelledby="modal-attendance-detail" size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết điểm danh môn {attendanceData?.subject} </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <Row className="mb-3">
                    <Col>
                        <div>
                            <strong>Số buổi đã học: </strong>{attendanceData?.totalClasses}
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <strong>Số buổi đúng giờ: </strong>{attendanceData?.attended}
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <strong>Số buổi vắng mặt: </strong>{attendanceData?.absent}
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <strong>Số buổi muộn: </strong>{attendanceData?.late}
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <strong>Số buổi nghỉ có phép: </strong>{attendanceData?.onLeave}
                        </div>
                    </Col>
                </Row>
                <Table bordered hover>
                    <thead>
                        <tr className="text-truncate text-center">
                            <th>Thời gian điểm danh</th>
                            <th>Có mặt</th>
                            <th>Vắng mặt</th>
                            <th>Muộn</th>
                            <th>Có phép</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataDetail.map((record, index) => (
                            <tr key={index} className="text-truncate text-center">
                                <td>{record.time}</td>
                                <td>{record.status === 'P' ? (<span className='text-bold'>&#10003;</span>) : ''}</td>
                                <td>{record.status === 'A' ? (<span className='text-bold'>&#10003;</span>) : ''}</td>
                                <td>{record.status === 'L' ? (<span className='text-bold'>&#10003;</span>) : ''}</td>
                                <td>{record.status === 'OL' ? (<span className='text-bold'>&#10003;</span>) : ''}</td>
                                <td>{record.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAttendanceDetail;
