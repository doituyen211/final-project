import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import DeleteComponent from "../../components/DeleteItemComponent";
import Input from "../../components/InputComponents";
import PagingComponent from "../../components/PagingComponent";
import API from "../../store/Api";
import "./schedule2.scss";

const INITIAL_STATE = {
    dataTable: [],
    titleTable: "ScheduleComponent",
    classTable: "table table-bordered table-hover",
    modalShow: false,
    modalProps: {
        show: false,
        action: "",
        formFieldsProp: [
            {
                name: "ma_mon_hoc",
                type: "text",
                label: "Tên môn học",
                placeholder: "Nhập tên môn học",
                validation: Yup.string()
                    .matches(
                        /^[a-zA-Z0-9_-]+$/,
                        "Schedule Name can only contain letters, numbers, underscores, and hyphens"
                    )
                    .required("Schedule Name is required"),
            },
            {
                name: "phong_hoc",
                type: "text",
                label: "Phòng Học",
                placeholder: "Nhập Phòng Học",
                validation: Yup.number()
                    .typeError("Duration must be a number")
                    .required("Duration is required")
                    .positive("Duration must be a positive number")
                    .integer("Duration must be an integer"),
            },
            {
                name: "thoi_gian_bat_dau",
                type: "date",
                label: "Thời Gian Bắt Đầu",
            },

            {
                name: "thoi_gian_ket_thuc",
                type: "date",
                label: "Thời Gian Kết Thúc",
            },
            {
                name: "ma_lop",
                type: "select",
                label: "Mã Lớp",
                placeholder: "Chọn Mã Lớp",
                apiUrl: "/data/IDClass.json",
                defaultOption: {
                    value: "",
                    label: "Chọn 1 Mã Lớp",
                },
                validation: Yup.string().required("Program Name is required"),
            },
            {
                name: "id_nhan_su",
                type: "select",
                label: "Giảng Viên",
                placeholder: "Chọn Giảng Viên",
                apiUrl: "/data/lecturers.json",
                defaultOption: { value: "", label: "Chọn Giảng Viên" },
                validation: Yup.string().required("Status is required"),
            },
        ],
        initialIsEdit: false,
        initialIdCurrent: null,
        api: API.SCHEDULE,
    },
};

// Các cột của bảng
const COLUMNS = [
    "STT",
    "Tên môn học",
    "Phòng Học",
    "Thời Gian Bắt Đầu",
    "Thời Gian Kết Thúc",
    "Mã Lớp",
    "Giảng Viên",
    "",
];

const ScheduleComponent2 = () => {
    // Function to format datetime from YYYY-MM-DDTHH:MM to YYYY/MM/DD HH:MM
    const formatDateTimeToCustomFormat = (datetime) => {
        console.log("datetime: ", datetime);
    };

    // const parseDateTimeFromCustomFormat = (datetime) => {
    //     if (datetime !== "") {
    //         const [date, time] = (datetime || "").split(" ");
    //         if (!date || !time) return ""; // Additional safeguard
    //         const [year, month, day] = (date || "").split("/");
    //         const [hour, minute] = (time || "").split(":");
    //         return `${year}-${month}-${day}T${hour}:${minute}`;
    //     }
    // };

    // Handle date change
    const handleDateChange = (e) => {
        const newDate = e.target.value; // YYYY-MM-DD
        console.log("Return Date Input" + newDate);
        // const formattedDate = formatDateTimeToCustomFormat(newDate + "T00:00"); // Assumes midnight time
        setFormData({
            ...formData,
            thoi_gian_bat_dau: newDate,
        });
    };

    const [state, setState] = useState(INITIAL_STATE);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionModal, setActionModal] = useState("CREATE");
    const [initialIdCurrent, setInitialIdCurrent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [program, setProgram] = useState("");
    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [statusOptions, setStatusOptions] = useState([]);
    const [programOptions, setProgramOptions] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        ma_mon_hoc: "",
        phong_hoc: "",
        thoi_gian_bat_dau: "",
        thoi_gian_ket_thuc: "",
        ma_lop: "",
        id_nhan_su: "",
    });

    const api = API.SCHEDULE;

    // Fetch data with optional filters
    const fetchData = useCallback(
        async (search = "", page = 1) => {
            try {
                const { data } = await axios.get(api, {
                    params: {
                        page: page,
                        pageSize: 10,
                        search,
                        status,
                        program,
                    },
                });
                setState((prevState) => ({
                    ...prevState,
                    dataTable: data.content,
                }));
                setCurrentPage(data.page);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        [api, status, program]
    );

    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        fetchData(searchTerm);
    }, [fetchData, searchTerm]);

    const handleProgramChange = useCallback((event) => {
        setProgram(event.target.value);
    }, []);

    const handleStatusChange = useCallback((event) => {
        setStatus(event.target.value);
    }, []);

    useEffect(() => {
        fetchData("", currentPage);
        fetchOptions();
    }, [fetchData, currentPage]);

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const fetchOptions = useCallback(async () => {
        try {
            const [statusResponse, programResponse] = await Promise.all([
                axios.get("/data/lecturers.json"),
                axios.get("/data/IDClass.json"),
            ]);
            setStatusOptions(statusResponse.data);
            setProgramOptions(programResponse.data);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    }, []);

    // Hàm xử lý xác nhận xóa
    const confirmDelete = (item) => {
        setDeleteItemId(item.id);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirmation = async () => {
        fetchData();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url =
                actionModal === "EDIT" ? `${api}/${initialIdCurrent}` : api;
            const method = actionModal === "EDIT" ? axios.put : axios.post;
            await method(url, formData);
            toast.success(
                `${
                    actionModal === "EDIT" ? "Cập nhật" : "Thêm mới"
                } thành công!`
            );
            fetchData(searchTerm, currentPage);
            setFormData({
                id: "",
                ma_mon_hoc: "",
                phong_hoc: "",
                thoi_gian_bat_dau: "",
                thoi_gian_ket_thuc: "",
                ma_lop: "",
                id_nhan_su: "",
            });
        } catch (error) {
            console.error(`Error ${actionModal.toLowerCase()} item:`, error);
            toast.error(`Failed to ${actionModal.toLowerCase()} item.`);
        }
    };

    useEffect(() => {
        if (actionModal === "EDIT" || actionModal === "VIEW") {
            axios
                .get(`${api}/${initialIdCurrent}`)
                .then((res) => setFormData(res.data))
                .catch((err) => console.error("Error fetching data:", err));
        }
    }, [actionModal, initialIdCurrent]);

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
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <Form onSubmit={handleSubmit}>
                                        <h3 className="text-start mb-4">
                                            {actionModal === "EDIT"
                                                ? "Cập Nhật"
                                                : "Thêm Mới"}
                                        </h3>
                                        <Row>
                                            <Col md={6} className="mb-3">
                                                <Form.Group controlId="ma_mon_hoc">
                                                    <Form.Label>
                                                        Tên môn học
                                                    </Form.Label>
                                                    <Input
                                                        type="text"
                                                        name="ma_mon_hoc"
                                                        value={
                                                            formData.ma_mon_hoc ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Nhập tên môn học"
                                                        className="form-control"
                                                        disabled={
                                                            actionModal ===
                                                            "VIEW"
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Group controlId="phong_hoc">
                                                    <Form.Label>
                                                        Phòng học
                                                    </Form.Label>
                                                    <Input
                                                        type="text"
                                                        name="phong_hoc"
                                                        value={
                                                            formData.phong_hoc ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        placeholder="Nhập phòng học"
                                                        className="form-control"
                                                        disabled={
                                                            actionModal ===
                                                            "VIEW"
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Group controlId="thoi_gian_bat_dau">
                                                    <Form.Label>
                                                        Thời gian bắt đầu
                                                    </Form.Label>
                                                    <Input
                                                        type="text"
                                                        name="thoi_gian_bat_dau"
                                                        value={
                                                            formData.thoi_gian_bat_dau ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        disabled={
                                                            actionModal ===
                                                            "VIEW"
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Group controlId="thoi_gian_ket_thuc">
                                                    <Form.Label>
                                                        Thời gian kết thúc
                                                    </Form.Label>
                                                    <Input
                                                        type="text"
                                                        name="thoi_gian_ket_thuc"
                                                        value={
                                                            formData.thoi_gian_ket_thuc ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        disabled={
                                                            actionModal ===
                                                            "VIEW"
                                                        }
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Group controlId="ma_lop">
                                                    <Form.Label>
                                                        Chọn mã lớp
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="ma_lop"
                                                        value={
                                                            formData.ma_lop ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        disabled={
                                                            actionModal ===
                                                            "VIEW"
                                                        }
                                                    >
                                                        <option value="">
                                                            Chọn mã lớp
                                                        </option>
                                                        {programOptions.map(
                                                            (option) => (
                                                                <option
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.id
                                                                    }
                                                                >
                                                                    {
                                                                        option.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} className="mb-3">
                                                <Form.Group controlId="id_nhan_su">
                                                    <Form.Label>
                                                        Giảng viên
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        name="id_nhan_su"
                                                        value={
                                                            formData.id_nhan_su ||
                                                            ""
                                                        }
                                                        onChange={handleChange}
                                                        disabled={
                                                            actionModal ===
                                                            "VIEW"
                                                        }
                                                    >
                                                        <option value="">
                                                            Chọn giảng viên
                                                        </option>
                                                        {statusOptions.map(
                                                            (option) => (
                                                                <option
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.id
                                                                    }
                                                                >
                                                                    {
                                                                        option.name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <div className="d-flex justify-content-center">
                                            <Button
                                                variant="secondary"
                                                className="me-2"
                                                type="button"
                                                onClick={() =>
                                                    setState((prev) => ({
                                                        ...prev,
                                                        modalShow: false,
                                                    }))
                                                }
                                            >
                                                Huỷ bỏ
                                            </Button>
                                            {actionModal === "VIEW" ? (
                                                <Button
                                                    variant="primary"
                                                    type="button"
                                                >
                                                    Chỉnh sửa
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                >
                                                    Lưu lại
                                                </Button>
                                            )}
                                        </div>
                                        {/*<ToastContainer/> /!* Add ToastContainer here *!/*/}
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="text-start mb-4">
                                        Danh sách lịch học
                                    </h3>
                                    <div className="d-flex mb-4">
                                        {/* Bộ lọc */}
                                        <div className="col-md-2 d-flex align-items-center gap-3">
                                            <Form.Select
                                                id="programStatus2"
                                                aria-label="Program"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                                value={program}
                                                onChange={handleProgramChange}
                                            >
                                                <option value="">
                                                    Chọn phòng học
                                                </option>
                                                {programOptions.map(
                                                    (option) => (
                                                        <option
                                                            key={option.value}
                                                            value={option.id}
                                                        >
                                                            {option.name}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center gap-3">
                                            <Form.Select
                                                id="programStatus2"
                                                aria-label="Program"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                                value={program}
                                                onChange={handleProgramChange}
                                            >
                                                <option value="">
                                                    Chọn mã lớp
                                                </option>
                                                {programOptions.map(
                                                    (option) => (
                                                        <option
                                                            key={option.value}
                                                            value={option.id}
                                                        >
                                                            {option.name}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center gap-3">
                                            <Form.Select
                                                id="programStatus1"
                                                aria-label="Status"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                                value={status}
                                                onChange={handleStatusChange}
                                            >
                                                <option value="">
                                                    Chọn giảng viên
                                                </option>
                                                {statusOptions.map((option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.id}
                                                    >
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </div>

                                        <div className="col-md-5 d-flex align-items-start divSearch">
                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                aria-label="Search input"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") {
                                                        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
                                                        handleSearch(); // Gọi hàm tìm kiếm
                                                    }
                                                }}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                aria-label="Search"
                                                onClick={handleSearch}
                                            >
                                                <i className="bi bi-search"></i>
                                            </Button>
                                        </div>
                                    </div>
                                    <Table className={state.classTable}>
                                        <thead>
                                            <tr>
                                                {COLUMNS.map((col, index) => (
                                                    <th key={index}>{col}</th>
                                                ))}
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
                                                            {item.ma_mon_hoc}
                                                        </td>
                                                        <td>
                                                            {item.phong_hoc}
                                                        </td>
                                                        <td>
                                                            {
                                                                item.thoi_gian_bat_dau
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                item.thoi_gian_ket_thuc
                                                            }
                                                        </td>
                                                        <td
                                                            className={
                                                                item.ma_lop ===
                                                                0
                                                                    ? "text-success"
                                                                    : item.ma_lop ===
                                                                      1
                                                                    ? "text-secondary"
                                                                    : ""
                                                            }
                                                        >
                                                            {programOptions.find(
                                                                (program) =>
                                                                    program.id ===
                                                                    item.ma_lop
                                                            )?.name || "N/A"}
                                                        </td>

                                                        <td
                                                            className={
                                                                item.id_nhan_su ===
                                                                0
                                                                    ? "text-success"
                                                                    : item.id_nhan_su ===
                                                                      1
                                                                    ? "text-secondary"
                                                                    : ""
                                                            }
                                                        >
                                                            {statusOptions.find(
                                                                (status) =>
                                                                    status.id ===
                                                                    item.id_nhan_su
                                                            )?.name || "N/A"}
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="light"
                                                                className="me-1"
                                                                onClick={() => {
                                                                    setFormData(
                                                                        {
                                                                            ...item,
                                                                        }
                                                                    );

                                                                    setInitialIdCurrent(
                                                                        item.id
                                                                    );
                                                                    setActionModal(
                                                                        "VIEW"
                                                                    );
                                                                }}
                                                            >
                                                                <BsEye />
                                                            </Button>
                                                            <Button
                                                                variant="primary"
                                                                className="me-1"
                                                                onClick={() => {
                                                                    setFormData(
                                                                        item
                                                                    );
                                                                    setInitialIdCurrent(
                                                                        item.id
                                                                    );
                                                                    setActionModal(
                                                                        "EDIT"
                                                                    );
                                                                }}
                                                            >
                                                                <BsPencil />
                                                            </Button>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() =>
                                                                    confirmDelete(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <BsTrash />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </Table>
                                    {/* Phân trang */}
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-auto">
                                            <PagingComponent
                                                totalPage={totalPages}
                                                currentPage={currentPage}
                                                onPageChange={handlePageChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
            {/* Modal xác nhận xóa */}
            {/* Modal xác nhận xóa */}
            <DeleteComponent
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onConfirm={() => fetchData()}
                deleteItemID={deleteItemId}
                apiDelete={api}
            />
        </>
    );
};

export default ScheduleComponent2;
