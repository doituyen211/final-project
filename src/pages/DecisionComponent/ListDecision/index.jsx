// src/components/ListDecision.js
import React, { useState } from 'react';
import EditDecision from '../EditDecision';
import DetailDecision from '../DetailDecision';
import ConfirmDeleteModal from '../deleteDecision';
import axios from 'axios';
import './style.scss';
import { deleteDecision } from '../service/decision';


const ListDecision = ({ rows }) => {
    const [currentDecision, setCurrentDecision] = useState([]);
    const [detailDecision, setDetailDecision] = useState([]);
    const [data, setData] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);


    const handleEditClick = (decision) => {
        setCurrentDecision(decision);
        setShowEditModal(true);
    };

    const handleDetailClick = (decision) => {
        setDetailDecision(decision);
        setShowDetailModal(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        deleteDecision(deleteId)
            .then(response => {
                setData(data.filter(item => item.id !== deleteId));
                console.log('Deleted successfully');
                setShowConfirmModal(false);
            })
            .catch(err => {
                console.log('Failed to delete:', err);
                setShowConfirmModal(false);
            });
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
    };


    return (
        <>
            {rows.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.manv}</td>
                    <td>{item.name}</td>
                    <td>{item.content}</td>
                    <td>{item.date}</td>
                    <td>{item.hinhthuc}</td>
                    <td>{item.status}</td>
                    <td className='action'>
                        <button
                            className='btn btn-primary'
                            onClick={() => handleEditClick(item)}
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                            style={{ margin: '0 10px' }}
                            className="btn btn-warning eye"
                            onClick={() => handleDetailClick(item)}
                        >
                            <i className="fa-solid fa-eye"></i>
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            ))}

            {/* Edit Modal */}
            <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editEmployeeModalLabel" aria-hidden={!showEditModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editEmployeeModalLabel">Chỉnh sửa quyết định</h5>
                            <button type="button" className="btn-close" onClick={handleCloseEditModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {currentDecision ? (
                                <EditDecision decision={currentDecision} onSubmitSuccess={handleCloseEditModal} />
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div> 
                    </div>
                </div>
            </div>


            {/* Detail Modal */}
            <div className={`modal fade ${showDetailModal ? 'show' : ''}`} style={{ display: showDetailModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="detailEmployeeModalLabel" aria-hidden={!showDetailModal}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailEmployeeModalLabel">Chi tiết quyết định</h5>
                            <button type="button" className="btn-close" onClick={handleCloseDetailModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {detailDecision ? <DetailDecision decision={detailDecision} /> : <p>Loading...</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseDetailModal}>Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                show={showConfirmModal}
                onClose={handleCloseConfirmModal}
                onConfirm={confirmDelete}
            />  


        </>
    );
};

export default ListDecision;
