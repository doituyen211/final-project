import React, { useState } from 'react';
import { deleteProgram } from '../../services/TrainingProgram';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmComponent from '../ModalProgramComponents/ConfirmComponent';
import DataTableDetailComponent from './ProgramTableDataDetailComponent';
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { Button, Spinner } from "react-bootstrap";

const TableDataComponent = ({ headers, dataTable, handleEditProgram, handleDeleteProgramSuccess, pathName, isLoading }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState();
    const [showDetail, setShowDetail] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const handleShowConfirm = (data) => {
        setSelectedProgram(data);
        setShowConfirm(true);
    };
    const handleViewClick = (data) => {
        setSelectedData(data);
        setShowDetail(true);
    };
    const handleCloseDetail = () => setShowDetail(false);
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
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="text-truncate text-center">
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={headers.length} style={{ textAlign: "center" }}>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </td>
                        </tr>
                    ) : (
                        dataTable.map((data, index) => (
                            <tr key={`program-${data.id}`} className="text-truncate text-center">
                                <td>{data.programName}</td>
                                <td>{data.courseName}</td>
                                <td>{data.fee}</td>
                                <td>{data.timeTrainning}</td>
                                <td>
                                    {data.status ? (
                                        <span className="badge badge-primary">Đang hoạt động</span>
                                    ) : (
                                        <span className="badge badge-danger">Tạm dừng</span>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant="link"
                                        className="me-2"
                                        onClick={() => handleViewClick(data)}
                                    >
                                        <BsEye className="text-secondary" />
                                    </Button>
                                    {pathName === "/programs" && (
                                        <>
                                            <Button
                                                className="me-2"
                                                variant="link"
                                                onClick={() => handleEditProgram(data)}
                                            >
                                                <BsPencil className="text-primary" />
                                            </Button>
                                            <Button
                                                variant="link"
                                                className=""
                                                onClick={() => handleShowConfirm(data)}
                                            >
                                                <BsTrash className="text-danger" />
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <ConfirmComponent
                show={showConfirm}
                onHide={handleCloseConfirm}
                handleDelete={handleDelete}
            />
            <DataTableDetailComponent
                show={showDetail}
                handleClose={handleCloseDetail}
                data={selectedData}
                isLoading={isLoading}
            />
        </>
    );
};

export default TableDataComponent;
