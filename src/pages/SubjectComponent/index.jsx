import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {Button, Form, Table} from "react-bootstrap";
import DeleteComponent from "../../components/DeleteItemComponent";
import PagingComponent from "../../components/PagingComponent";
import API from "../../store/Api";
import FormComponentWithValidation from "../../components/FormComponentWithValidation";
import * as Yup from 'yup';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs'; // Import Bootstrap icons
import "./SubjectComponent.scss"
const INITIAL_STATE = {
    dataTable: [], // Dữ liệu bảng
    titleTable: "SubjectComponent", // Tiêu đề của bảng
    classTable: "table table-bordered table-hover", // Lớp CSS của bảng
    modalShow: false, // Trạng thái hiển thị modal
    modalProps: {
        show: false,
        action: "",
        formFieldsProp: [
            {
                name: "subject_name",
                type: "text",
                label: "Tên môn học",
                placeholder: "Nhập tên môn học",
                validation: Yup.string()
                    .matches(/^[a-zA-Z0-9_-]+$/, 'Subject Name can only contain letters, numbers, underscores, and hyphens')
                    .required('Subject Name is required'),
            },
            {
                name: "training_duration",
                type: "number",
                label: "Thời lượng đào tạo",
                placeholder: "Nhập thời lượng đào tạo",
                validation: Yup.number()
                    .typeError('Duration must be a number')
                    .required('Duration is required')
                    .positive('Duration must be a positive number')
                    .integer('Duration must be an integer'), // Example constraints
            },
            {
                name: "training_program_id",
                type: "select",
                label: "Chương trình đào tạo",
                placeholder: "Chọn 1 chương trình đào tạo",
                apiUrl: "/data/program.json",
                defaultOption: { value: "", label: "Chọn 1 chương trình đào tạo" },
                validation: Yup.string().required('Program Name is required'),
            },
            {
                name: "status",
                type: "select",
                label: "Status",
                placeholder: "Chọn trạng thái",
                apiUrl: "/data/status.json",
                defaultOption: { value: "", label: "Chọn trạng thái" },
                validation: Yup.string().required('Status is required'),
            },
        ],
        initialIsEdit: false,
        initialIdCurrent: null,
        api: API.SUBJECT,
    },
};


// Các cột của bảng
const COLUMNS = [
    "STT",
    "Tên môn học",
    "Thời lượng",
    "Tên chương trình học",
    "Trạng thái",
    "",
];

const SubjectComponent = () => {
    const [state, setState] = useState(INITIAL_STATE);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionModal, setActionModal] = useState("CREATE");
    const [initialIdCurrent, setInitialIdCurrent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [program, setProgram] = useState("");
    const [status, setStatus] = useState("");
    const [dataForm, setDataForm] = useState({
        subject_id: "",
        subject_name: "",
        status: "",
        training_duration: "",
        training_program_id: "",
    });

    const api = API.SUBJECT;

    // Fetch data with optional filters
    const fetchData = useCallback(
        async (search = "", page = 1) => {
            try {
                console.log("RENDER with", {
                    page: page,
                    pageSize: 10,
                    search,
                    status,
                    program,
                });
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

    //Search
    const [searchTerm, setSearchTerm] = useState("");

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
        console.log("Render SubjectComponent");
    }, [fetchData, currentPage]);

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);



    const [statusOptions, setStatusOptions] = useState([]);
    const [programOptions, setProgramOptions] = useState([]);
    // Fetch options for filters
    const fetchOptions = useCallback(async () => {
        try {
            const [statusResponse, programResponse] = await Promise.all([
                axios.get("/data/status.json"),
                axios.get("/data/program.json"),
            ]);
            setStatusOptions(statusResponse.data);
            setProgramOptions(programResponse.data);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    }, []);
    // Hàm xử lý xác nhận xóa
    const confirmDelete = (item) => {
        setDeleteItemId(item.subject_id);
        setShowConfirmModal(true);
    };

    // Hàm xử lý xác nhận xóa và cập nhật dữ liệu
    const handleDeleteConfirmation = () => {
        fetchData();
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản lý Môn học</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">
                                    {/*<button*/}
                                    {/*    onClick={() =>*/}
                                    {/*        console.log("Home clicked")*/}
                                    {/*    }*/}
                                    {/*>*/}
                                        Home
                                    {/*</button>*/}
                                </li>
                                <li className="breadcrumb-item active">
                                    Quản lý môn học
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        {/* Card cho Form Component */}
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <FormComponentWithValidation
                                        title={
                                            actionModal === "EDIT"
                                                ? "Cập Nhật"
                                                : actionModal === "CREATE"
                                                    ? "Thêm Mới"
                                                    : "Chi tiết"
                                        }
                                        fields={state.modalProps.formFieldsProp}
                                        getData={fetchData}
                                        action={actionModal}
                                        idCurrent={initialIdCurrent}
                                        onClose={() => {
                                            // Refresh page by fetching data again
                                            fetchData(searchTerm, currentPage);
                                            setInitialIdCurrent(null); // Reset current ID if needed
                                            setActionModal("CREATE"); // Reset action if needed
                                        }}
                                        api={api}
                                        dataForm={dataForm}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card cho các bộ lọc, ô tìm kiếm và nút thêm mới */}
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h3 className="text-start mb-4">Danh sách môn học</h3> {/* Add form title here */}
                                    <div className="row mb-4">
                                        {/* Bộ lọc */}
                                        <div className="col-md-3 d-flex align-items-center gap-3">
                                            <Form.Select
                                                id="programStatus2"
                                                aria-label="Program"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                                value={program}
                                                onChange={handleProgramChange}
                                            >
                                                <option value="">
                                                    Chọn chương trình học
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
                                        <div className="col-md-3 d-flex align-items-center gap-3">
                                            <Form.Select
                                                id="programStatus1"
                                                aria-label="Status"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                                value={status}
                                                onChange={handleStatusChange}
                                            >
                                                <option value="">
                                                    Chọn trạng thái
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
                                        <div className="col-md-6 d-flex align-items-center gap-3">
                                            <input
                                                type="text"
                                                className="form-control rounded-pill border-secondary flex-fill"
                                                placeholder="Search..."
                                                aria-label="Search input"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                aria-label="Search"
                                                className="d-flex align-items-center px-3 rounded-pill"
                                                onClick={handleSearch}
                                            >
                                                <i className="bi bi-search"></i>
                                            </Button>
                                        </div>

                                    </div>
                                    <Table  bordered hover>
                                        <thead>
                                        <tr>
                                            {COLUMNS.map((col, index) => (
                                                <th key={index}>{col}</th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {state.dataTable.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 10 * (currentPage - 1) + 1}</td>
                                                <td>{row.subject_name}</td>
                                                <td>{row.training_duration}</td>
                                                <td>
                                                    {programOptions.find(program => program.id === row.training_program_id)?.name || 'N/A'}
                                                </td>
                                                <td className={row.status === 0 ? "text-success": row.status === 1 ? "text-secondary" : ""}>
                                                    {statusOptions.find(status => status.id === row.status)?.name || 'N/A'}
                                                </td>

                                                <td className="text-center">
                                                    <Button
                                                        variant="light"
                                                        className="me-2"
                                                        onClick={() => {
                                                            setInitialIdCurrent(
                                                                row.subject_id
                                                            );
                                                            setActionModal("VIEW");
                                                            // console.log("View"+JSON.stringify(row))
                                                            setDataForm(row);
                                                        }}
                                                    >
                                                        <BsEye/>
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        className="me-2"
                                                        onClick={() => {
                                                            setInitialIdCurrent(
                                                                row.subject_id
                                                            );
                                                            setActionModal("EDIT");
                                                            setDataForm(row);
                                                        }}
                                                    >
                                                        <BsPencil/>
                                                    </Button>

                                                    <Button
                                                        variant="danger"
                                                        onClick={() => confirmDelete(row)}
                                                    >
                                                        <BsTrash/>
                                                    </Button>

                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>

                                    </Table>
                                    {/* Bảng dữ liệu */}

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

            {/* Modal xác nhận xóa */}
            <DeleteComponent
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onConfirm={handleDeleteConfirmation}
                deleteItemID={deleteItemId}
                apiDelete={api}
            />
        </>
    );
};

export default SubjectComponent;
