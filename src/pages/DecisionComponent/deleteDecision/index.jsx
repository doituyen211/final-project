import React from 'react';
import PropTypes from 'prop-types';

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden={!show}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmDeleteModalLabel">Xác nhận xóa</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Bạn có chắc chắn muốn xóa quyết định này không?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ConfirmDeleteModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;
