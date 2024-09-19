import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import DeleteComponent from "../../components/DeleteItemComponent";
import PagingComponent from "../../components/PagingComponent";
import "./schedule2.scss";

const ScheduleComponent2 = () => {
    const [state, setState] = useState({
        dataTable: [],
        classTable: "table table-striped",
        modalShow: false,
    });
    const [formData, setFormData] = useState({});
    const [actionModal, setActionModal] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [classR, setClassR] = useState("");
    const [lecturerStatus, setLecturerStatus] = useState("");
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:9001/schedule/all"
                );
                const data = await response.json();
                setOriginalData(data); // Lưu dữ liệu gốc
                setState((prev) => ({
                    ...prev,
                    dataTable: data,
                }));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
        console.log(fetchData);
    }, []);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                let url = `http://localhost:9001/schedule/search?page=${
                    currentPage - 1
                }&limit=10`;
                if (searchTerm) {
                    url += `&subjectName=${encodeURIComponent(searchTerm)}`;
                    // Cập nhật URL trong thanh địa chỉ mà không tải lại trang
                    window.history.pushState(
                        null,
                        "",
                        `/schedule?subjectName=${encodeURIComponent(
                            searchTerm
                        )}`
                    );
                } else {
                    // Nếu không có từ khóa tìm kiếm, xóa query params trong URL
                    window.history.pushState(null, "", "/schedules");
                }

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setState((prev) => ({
                    ...prev,
                    dataTable: data,
                }));
            } catch (error) {
                console.error("Error searching data: ", error);
            }
        };

        if (searchTerm === "") {
            // Khi xóa tìm kiếm, phục hồi dữ liệu gốc
            setState((prev) => ({
                ...prev,
                dataTable: originalData,
            }));
            // Xóa query params trong URL nhưng giữ phần /schedule
            window.history.pushState(null, "", "/schedules");
        } else {
            handleSearch();
        }
    }, [searchTerm, currentPage, originalData]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const confirmDelete = (item) => {
        setDeleteItemId(item.id);
        setShowConfirmModal(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Thêm logic xử lý thêm mới hoặc cập nhật dữ liệu ở đây
    };

    const handleClassRChange = (event) => {
        setClassR(event.target.value);
    };

    const handleStatusChange = (event) => {
        setLecturerStatus(event.target.value);
    };

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const columns = [
        {
            title: "Subject Name",
            dataIndex: "subject_name",
            key: "subject_name",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Start Time",
            dataIndex: "start_time",
            key: "start_time",
        },
        {
            title: "End Time",
            dataIndex: "end_time",
            key: "end_time",
        },
        {
            title: "Class Name",
            dataIndex: "class_name",
            key: "class_name",
        },
        {
            title: "Classroom",
            dataIndex: "classroom",
            key: "classroom",
        },
        {
            title: "Staff ID",
            dataIndex: "staff_id",
            key: "staff_id",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        variant="link"
                        className="me-1"
                        onClick={() => {
                            setFormData({
                                ...record,
                            });
                            setActionModal("VIEW");
                            handleShow();
                        }}
                    >
                        <BsEye className="text-secondary" />
                    </Button>

                    <Button
                        variant="link"
                        className="me-1"
                        onClick={() => {
                            setFormData({
                                ...record,
                            });
                            setActionModal("EDIT");
                            handleShow();
                        }}
                    >
                        <BsPencil className="text-primary" />
                    </Button>

                    <Button
                        variant="link"
                        onClick={() => confirmDelete(record)}
                    >
                        <BsTrash className="text-danger" />
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản lý Lịch Học</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Home</li>
                                <li className="breadcrumb-item active">
                                    Quản lý Lịch Học
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-4">
                                        <h4 className="text-start">
                                            Danh sách lịch học
                                        </h4>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4 gap-2">
                                        {/* Bộ lọc */}
                                        <div className="col-md-2.5 d-flex gap-3">
                                            <div className="">
                                                <Form.Select
                                                    id="programClassR"
                                                    aria-label="ClassR"
                                                    className="rounded-pill border-secondary flex-fill custom-width"
                                                    value={classR}
                                                    onChange={
                                                        handleClassRChange
                                                    }
                                                >
                                                    <option value="">
                                                        Chọn lớp học
                                                    </option>
                                                </Form.Select>
                                            </div>
                                            <div className="">
                                                <Form.Select
                                                    id="programStatus1"
                                                    aria-label="Status"
                                                    className="rounded-pill border-secondary flex-fill custom-width"
                                                    value={lecturerStatus}
                                                    onChange={
                                                        handleStatusChange
                                                    }
                                                >
                                                    <option value="">
                                                        Chọn phòng học
                                                    </option>
                                                </Form.Select>
                                            </div>
                                            <div className="">
                                                <Form.Select
                                                    id="programStatus2"
                                                    aria-label="Status"
                                                    className="rounded-pill border-secondary flex-fill custom-width"
                                                    value={lecturerStatus}
                                                    onChange={
                                                        handleStatusChange
                                                    }
                                                >
                                                    <option value="">
                                                        Chọn giảng viên
                                                    </option>
                                                </Form.Select>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex divSearch">
                                            <input
                                                type="text"
                                                className=""
                                                placeholder="Tìm kiếm"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <Button
                                                variant=""
                                                className="ms-2 rounded-circle"
                                            >
                                                <i className="fas fa-search"></i>
                                            </Button>
                                        </div>
                                        <div className="col-md-2.5 d-flex">
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    setFormData({});
                                                    setActionModal("ADD");
                                                    handleShow();
                                                }}
                                            >
                                                Thêm Mới
                                            </Button>
                                        </div>
                                    </div>
                                    {/* <Table
                                        bordered
                                        hover
                                        className={state.classTable}
                                    >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Subject Name</th>
                                                <th>Time</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th>Class Name</th>
                                                <th>Classroom</th>
                                                <th>Staff ID</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {state.dataTable.map(
                                                (item, index) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            {index +
                                                                10 *
                                                                    (currentPage -
                                                                        1) +
                                                                1}
                                                        </td>
                                                        <td>
                                                            {item.subject_name}
                                                        </td>
                                                        <td>{item.time}</td>
                                                        <td>
                                                            {moment(
                                                                item.start_time
                                                            ).format(
                                                                "MM/DD/YYYY"
                                                            )}
                                                        </td>
                                                        <td>
                                                            {moment(
                                                                item.end_time
                                                            ).format(
                                                                "MM/DD/YYYY"
                                                            )}
                                                        </td>
                                                        <td>
                                                            {item.class_name}
                                                        </td>
                                                        <td>
                                                            {item.classroom}
                                                        </td>
                                                        <td>{item.staffId}</td>
                                                        <td>
                                                            <Button
                                                                variant="link"
                                                                className="me-1"
                                                                onClick={() => {
                                                                    setFormData(
                                                                        {
                                                                            ...item,
                                                                        }
                                                                    );
                                                                    setActionModal(
                                                                        "VIEW"
                                                                    );
                                                                    handleShow();
                                                                }}
                                                            >
                                                                <BsEye className="text-secondary" />
                                                            </Button>
                                                            <Button
                                                                variant="link"
                                                                className="me-1"
                                                                onClick={() => {
                                                                    setFormData(
                                                                        {
                                                                            ...item,
                                                                        }
                                                                    );
                                                                    setActionModal(
                                                                        "EDIT"
                                                                    );
                                                                    handleShow();
                                                                }}
                                                            >
                                                                <BsPencil className="text-primary" />
                                                            </Button>
                                                            <Button
                                                                variant="link"
                                                                onClick={() =>
                                                                    confirmDelete(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <BsTrash className="text-danger" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </Table> */}
                                    <Table
                                        columns={columns}
                                        dataSource={originalData}
                                        rowKey="id"
                                    />
                                    {/* Pagination */}
                                    <PagingComponent
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
            <DeleteComponent
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onDelete={() => {
                    // Thêm logic xóa dữ liệu ở đây
                    setShowConfirmModal(false);
                }}
            />
            {/* Modal Form */}
            <div
                className={`modal fade ${showModal ? "show d-block" : ""}`}
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                style={{ display: showModal ? "block" : "none" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {actionModal === "ADD"
                                    ? "Thêm Mới"
                                    : "Chỉnh Sửa"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                                aria-label="Close"
                            ></button>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <Row>
                                    {/* Cột bên trái */}
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                Subject Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="subjectId"
                                                value={
                                                    formData.subject_name || ""
                                                }
                                                onChange={handleChange}
                                                placeholder="Enter Subject Name"
                                                readOnly={
                                                    actionModal === "VIEW"
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="startTime"
                                                value={
                                                    formData.start_time || ""
                                                }
                                                onChange={handleChange}
                                                placeholder="Enter Start Time"
                                                readOnly={
                                                    actionModal === "VIEW"
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Class Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="classId"
                                                value={
                                                    formData.class_name || ""
                                                }
                                                onChange={handleChange}
                                                placeholder="Enter Class Name"
                                                readOnly={
                                                    actionModal === "VIEW"
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Staff Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="staffId"
                                                value={
                                                    formData.staff_name || ""
                                                }
                                                onChange={handleChange}
                                                placeholder="Enter Staff ID"
                                                readOnly={
                                                    actionModal === "VIEW"
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    {/* Cột bên phải */}
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Time</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="time"
                                                value={formData.time || ""}
                                                onChange={handleChange}
                                                readOnly={
                                                    actionModal === "VIEW"
                                                }
                                                placeholder="Enter Time"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>End Time</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="endTime"
                                                value={formData.end_time || ""}
                                                onChange={handleChange}
                                                readOnly={
                                                    actionModal === "VIEW"
                                                }
                                                placeholder="Enter End Time"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Classroom</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="classroom"
                                                value={formData.classroom || ""}
                                                onChange={handleChange}
                                                readOnly={
                                                    actionModal === "VIEW"
                                                }
                                                placeholder="Enter Classroom"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    {actionModal === "ADD"
                                        ? "Add"
                                        : "Save changes"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScheduleComponent2;
