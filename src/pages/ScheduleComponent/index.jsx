import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Select,
    Space,
    Table,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";

const ScheduleComponent = () => {
    const [dataTable, setDataTable] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [formData, setFormData] = useState({});
    const [actionModal, setActionModal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [classNameOptions, setClassNameOptions] = useState([]);
    const [staffOptions, setStaffOptions] = useState([]);

    const handleShow = () => setShowModal(true);
    useEffect(() => {
        const url = new URL(window.location);
        url.searchParams.delete("search");
        window.history.pushState({}, "", url);
        axios
            .get("http://localhost:9001/schedule/all")
            .then((response) => {
                let ResponseData = response.data.data.filter(
                    (res) => res.status === true
                );
                setDataTable(ResponseData);
                setOriginalData(response.data.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const sortData = dataTable.sort((a, b) => a.id - b.id);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        axios
            .get("http://localhost:9001/schedule/select_subject_name")
            .then((response) => {
                setSubjectOptions(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching subject names: ", error);
            });

        axios
            .get("http://localhost:9001/schedule/select_listClass_name")
            .then((response) => {
                setClassNameOptions(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching class names: ", error);
            });

        axios
            .get("http://localhost:9001/schedule/select_staff_name")
            .then((response) => {
                setStaffOptions(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching staff IDs: ", error);
            });
    }, []);

    const confirmDelete = (item) => {
        setDeleteItemId(item.id);
        setShowConfirmModal(true);
    };

    const handleDelete = () => {
        axios
            .delete(
                `http://localhost:9001/schedule/delete-schedule/${deleteItemId}`
            )
            .then(() => {
                message.success("Xóa thành công!");
                setDataTable(
                    dataTable.filter((item) => item.id !== deleteItemId)
                );
                setShowConfirmModal(false);
            })
            .catch((error) => {
                console.error("Error deleting data: ", error);
                message.error("Xóa không thành công.");
            });
    };

    const handleEdit = () => {
        axios
            .put(
                `http://localhost:9001/schedule/update-schedule/${formData.id}`,
                formData
            )
            .then(() => {
                message.success("Cập nhật thành công!");
                setDataTable(
                    dataTable.map((item) =>
                        item.id === formData.id ? formData : item
                    )
                );
                setShowModal(false);
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
                message.error("Cập nhật không thành công.");
            });
    };
    console.log(formData);

    const handleAdd = () => {
        axios
            .post(`http://localhost:9001/schedule/add-schedule`, formData)
            .then((response) => {
                message.success("Thêm mới thành công!");
                setDataTable([...dataTable, response.data]); // Thêm dữ liệu mới vào bảng
                setShowModal(false);
                setFormData({});
            })
            .catch((error) => {
                console.error("Error adding data: ", error);
                message.error("Thêm mới không thành công.");
            });
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const newUrl = `${window.location.pathname}?search=${encodeURIComponent(
            searchTerm
        )}`;
        window.history.pushState({ searchTerm }, "", newUrl);

        const filteredData = originalData.filter((item) =>
            item.subject_name.toLowerCase().includes(value.toLowerCase())
        );

        setDataTable(filteredData);
    };

    const classNameOp = Array.from(
        new Set(sortData.map((item) => item.class_name))
    ).map((program) => ({
        text: program,
        value: program,
    }));

    const classRoomIDOp = Array.from(
        new Set(sortData.map((item) => item.classroom))
    ).map((program) => ({
        text: program,
        value: program,
    }));

    const StaffOp = Array.from(
        new Set(sortData.map((item) => item.staff_id))
    ).map((program) => ({
        text: program,
        value: program,
    }));

    const subjectOp = Array.from(
        new Set(sortData.map((item) => item.subject_name))
    ).map((program) => ({
        text: program,
        value: program,
    }));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Subject Name",
            dataIndex: "subject_name",
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Time",
            dataIndex: "time",
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Start Time",
            dataIndex: "start_time",
            render: (text) => formatDate(text),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "End Time",
            dataIndex: "end_time",
            render: (text) => formatDate(text),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Class Name",
            dataIndex: "class_name",
            filters: classNameOp,
            onFilter: (value, record) => record.class_name.includes(value),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Classroom",
            dataIndex: "classroom",
            filters: classRoomIDOp,
            onFilter: (value, record) => record.classroom.includes(value),
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Staff ID",
            dataIndex: "staff_id",
            filters: StaffOp,
            onFilter: (value, record) => record.staff_id === value,
            sortDirections: ["descend", "ascend"],
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

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

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
                                <li className="breadcrumb-item">
                                    <button
                                        onClick={() =>
                                            console.log("Home clicked")
                                        }
                                    >
                                        Home
                                    </button>
                                </li>
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
                                    <div className="d-flex justify-content-between mb-4"></div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <div className="col-md-4 d-flex divSearch">
                                            <Input
                                                placeholder="Tìm kiếm theo tên môn học"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                            <Button
                                                variant=""
                                                className="ms-2 rounded-circle"
                                            >
                                                <i className="fas fa-search"></i>
                                            </Button>
                                        </div>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setFormData({});
                                                setActionModal("ADD");
                                                handleShow();
                                            }}
                                        >
                                            Thêm Mới
                                        </Button>
                                    </div>
                                    <Table
                                        columns={columns}
                                        dataSource={dataTable}
                                        onChange={onChange}
                                        rowKey="id"
                                        pagination={{ pageSize: 10 }}
                                        bordered
                                        className="custom-table"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                title={
                    actionModal === "EDIT"
                        ? "Chỉnh sửa lịch học"
                        : "Thêm mới lịch học"
                }
                visible={showModal}
                onCancel={() => setShowModal(false)}
                onOk={
                    actionModal === "EDIT"
                        ? handleEdit
                        : actionModal === "ADD"
                        ? handleAdd
                        : () => setShowModal(false)
                }
            >
                <Form layout="vertical">
                    <Form.Item label="Subject Name">
                        <Select
                            name="subject_id"
                            value={formData.subject_name || ""}
                            onChange={(value) =>
                                setFormData({ ...formData, subject_id: value })
                            }
                        >
                            {subjectOptions.map((option) => (
                                <Select.Option
                                    key={option.id}
                                    value={option.id}
                                >
                                    {option.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Time">
                        <Input
                            name="time"
                            value={formData.time || ""}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Start Time">
                        <Input
                            type="date"
                            name="start_time"
                            value={
                                formData.start_time
                                    ? formData.start_time.slice(0, 10)
                                    : ""
                            }
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="End Time">
                        <Input
                            type="date"
                            name="end_time"
                            value={
                                formData.end_time
                                    ? formData.end_time.slice(0, 10)
                                    : ""
                            }
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Class Name">
                        <Select
                            name="class_id"
                            value={formData.class_name || ""}
                            onChange={(value) =>
                                setFormData({ ...formData, class_id: value })
                            }
                        >
                            {classNameOptions.map((option) => (
                                <Select.Option
                                    key={option.id}
                                    value={option.id}
                                >
                                    {option.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Classroom">
                        <Input
                            name="classroom"
                            value={formData.classroom || ""}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item label="Staff ID">
                        <Select
                            name="staff_id"
                            value={formData.staff_id || ""}
                            onChange={(value) =>
                                setFormData({ ...formData, staff_id: value })
                            }
                        >
                            {staffOptions.map((option) => (
                                <Select.Option
                                    key={option.id}
                                    value={option.id}
                                >
                                    {option.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Xác nhận xóa"
                visible={showConfirmModal}
                onOk={handleDelete}
                onCancel={() => setShowConfirmModal(false)}
            >
                <p>Bạn có chắc chắn muốn xóa lịch học này không?</p>
            </Modal>
        </>
    );
};

export default ScheduleComponent;
