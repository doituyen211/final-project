import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableAtendanceComponent from '../../components/AttendanceStudentComponent/TableAttendanceComponent';
import { getAttendanceListByStudentId } from '../../services/AttendanceStudent';
import { classApi } from '../../services/classApi';
import { Button } from 'react-bootstrap';

const AttendanceStudent = () => {
    const cols = ['Môn học', 'Tổng số buổi lớp đã học', 'Số buổi đúng giờ', 'Số buổi vắng mặt', 'Số buổi muộn', 'Số buổi nghỉ có phép', ''];
    const [dataTable, setDataTable] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [classData, setClassData] = useState([]);
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        getAllClassByStudentId();
        getAllAttendance();
    }, []);

    const handleViewAttendance = (id) => {
        setActiveTab(id); // Chuyển thẳng id (không cần chuỗi)
        getAllAttendance();
    };

    const getAllClassByStudentId = async () => {
        try {
            setIsLoading(true);
            let response = await classApi.getClassList();
            if (response && response.data) {
                setClassData(response.data.data);
                setActiveTab(response.data.data[0].id); // Đặt id đầu tiên làm active mặc định
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getAllAttendance = async () => {
        try {
            setIsLoading(true);
            let response = await getAttendanceListByStudentId();
            if (response && response.data) {
                setDataTable(response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Kết quả điểm danh</h2>
            <div className="mb-4 btn-group btn-group-toggle">
                {classData.map((cls) => (
                    <Button
                        key={cls.id}
                        variant={activeTab === cls.id ? 'primary' : 'light'} // So sánh số với số
                        onClick={() => handleViewAttendance(cls.id)}
                    >
                        {cls.className}
                    </Button>
                ))}
            </div>
            <div className="card">
                <div className="card-body">
                    <TableAtendanceComponent
                        headers={cols}
                        dataTable={dataTable}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default AttendanceStudent;
