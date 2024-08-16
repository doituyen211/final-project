
import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { BsEye } from 'react-icons/bs';
import { getDetailAttendanceBySubjectId } from '../../services/AttendanceStudent';
import ModalAttendanceDetail from './ModalAtendanceDetail';

const TableAtendanceComponent = ({ headers, dataTable, isLoading }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [selectedData, setSelectedData] = useState();
    const [dataDetail, setDataDetail] = useState([]);
    const getAttendanceDetail = async () => {
        try {
            let response = await getDetailAttendanceBySubjectId();
            if (response) {
                setDataDetail(response.data)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const handleViewDetail = (data) => {
        setShowDetail(true);
        setSelectedData(data);
        getAttendanceDetail();
    }
    const handleClose = () => {
        setShowDetail(false)
        setDataDetail(false);
        setDataDetail([]);
    }
    return (
        <>
            <table className="table table-bordered">
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
                                <td>{data.subject}</td>
                                <td>{data.totalClasses}</td>
                                <td>{data.attended}</td>
                                <td>{data.absent}</td>
                                <td>{data.late}</td>
                                <td>{data.onLeave}</td>
                                <td>
                                    <Button
                                        variant="link"
                                        className="me-2"
                                        onClick={() => handleViewDetail(data)}
                                    >
                                        <BsEye className="text-secondary" />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <ModalAttendanceDetail
                show={showDetail}
                handleClose={handleClose}
                attendanceData={selectedData}
                dataDetail={dataDetail}
            />
        </>
    );
};

export default TableAtendanceComponent;











