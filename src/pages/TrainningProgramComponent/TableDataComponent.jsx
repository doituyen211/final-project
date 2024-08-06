import React, { useState } from 'react';
import { deleteProgram } from '../../services/TrainingProgram';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmComponent from './ConfirmComponent';
const TableDataComponent = ({ headers, dataTable, handleEditProgram, handleDeleteProgramSuccess, handleViewClick }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState();
    const handleShowConfirm = (data) => {
        setSelectedProgram(data);
        setShowConfirm(true);
    };

    const handleCloseConfirm = () => {
        setSelectedProgram(null);
        setShowConfirm(false);
    };

    const handleDelete = () => {
        if (selectedProgram) {
            deleteProgram(selectedProgram.id)
                .then(() => {
                    toast.success('Xóa thành công');
                    handleDeleteProgramSuccess(selectedProgram.id); // Call success handler
                    handleCloseConfirm();
                })
                .catch((error) => {
                    toast.error(`Lỗi khi xóa: ${error.message}`);
                    handleCloseConfirm();
                });
        }
    };
    return (
        <>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr className="text-truncate">
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map((data, index) => (
                        <tr key={`program-${data.id}`} className="text-truncate">
                            <td>{data.programName}</td>
                            <td>{data.courseName}</td>
                            <td>{data.fee}</td>
                            <td>{data.timeTrainning}</td>
                            <td>{data.status ? (<span class="badge badge-primary">Đang hoạt động</span>) : (<span class="badge badge-danger">Tạm dừng</span>)}</td>
                            <td>
                                <button className='me-2 btn btn-light' onClick={() => handleViewClick(data)} >View</button>
                                <button
                                    className='me-2 btn btn-primary'
                                    onClick={() => handleEditProgram(data)}
                                >
                                    Edit
                                </button>
                                <button className='btn btn-danger' onClick={() => handleShowConfirm(data)}>Delete</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmComponent
                show={showConfirm}
                onHide={handleCloseConfirm}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default TableDataComponent;