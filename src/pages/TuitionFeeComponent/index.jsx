import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import DeleteComponent from "../../components/DeleteItemComponent";
import PagingComponent from "../../components/PagingComponent";
import API from "../../store/Api";
import FormComponentWithValidation from "../../components/FormComponentWithValidation";
import * as Yup from 'yup';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import "./TuitionFeeComponent.scss";
import { toast, ToastContainer } from "react-toastify";
import Input from "../../components/InputComponents";

const INITIAL_STATE = {
    dataTable: [],
    titleTable: "SubjectComponent",
    classTable: "table table-bordered table-hover",
    modalShow: false,
    modalProps: {
        show: false,
        action: "",
        formFieldsProp: [
            {
                name: "id_hoc_vien",
                type: "number",
                label: "ID Học viên",
                placeholder: "Nhập ID học viên",
                validation: Yup.number()
                    .typeError('ID học viên phải là một số')
                    .required('ID học viên là bắt buộc')
                    .positive('ID học viên phải là một số dương')
                    .integer('ID học viên phải là một số nguyên'),
            },
            {
                name: "id_ctdt",
                type: "number",
                label: "ID Chương trình đào tạo",
                placeholder: "Nhập ID chương trình đào tạo",
                validation: Yup.number()
                    .typeError('ID chương trình đào tạo phải là một số')
                    .required('ID chương trình đào tạo là bắt buộc')
                    .positive('ID chương trình đào tạo phải là một số dương')
                    .integer('ID chương trình đào tạo phải là một số nguyên'),
            },
            {
                name: "so_tien",
                type: "number",
                label: "Số tiền",
                placeholder: "Nhập số tiền",
                validation: Yup.number()
                    .typeError('Số tiền phải là một số')
                    .required('Số tiền là bắt buộc')
                    .positive('Số tiền phải là một số dương'),
            },
            {
                name: "phuong_thuc_thanh_toan",
                type: "text",
                label: "Phương thức thanh toán",
                placeholder: "Nhập phương thức thanh toán",
                validation: Yup.string()
                    .required('Phương thức thanh toán là bắt buộc'),
            },
            {
                name: "ngay_thanh_toan",
                type: "date",
                label: "Ngày thanh toán",
                placeholder: "Chọn ngày thanh toán",
                validation: Yup.date()
                    .required('Ngày thanh toán là bắt buộc'),
            },
            {
                name: "trang_thai",
                type: "select",
                label: "Trạng thái",
                placeholder: "Chọn trạng thái",
                apiUrl: "/data/status.json",  // Adjust API endpoint as needed
                defaultOption: { value: "", label: "Chọn trạng thái" },
                validation: Yup.string().required('Trạng thái là bắt buộc'),
            },
            {
                name: "ghi_chu",
                type: "textarea",
                label: "Ghi chú",
                placeholder: "Nhập ghi chú",
                validation: Yup.string(),
            },
        ],
        initialIsEdit: false,
        initialIdCurrent: null,
        api: API.SUBJECT,
    },
};
const COLUMNS = [
    "STT",                    // Serial number or index
    "ID Học viên",            // ID of the student
    "ID Chương trình đào tạo", // ID of the training program
    "Số tiền",                // Amount of payment
    "Phương thức thanh toán",  // Payment method
    "Ngày thanh toán",        // Payment date
    "Trạng thái",             // Status
    "Ghi chú",                // Notes or comments
    "",                       // Empty column for actions or additional features
];


const TuitionFeeComponent = () => {
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
                if (search !== "" || status !== "" || program !== "") page = 1;
                // const { data } = await axios.get(api, {
                //     params: {
                //         page: page,
                //         pageSize: 10,
                //         search,
                //         status,
                //         program,
                //     },
                // });
                const { data } = await axios.get("https://66aa0b5b613eced4eba7559a.mockapi.io/tuitiofee", {
                    params: {
                        page: page,
                        limit: 10,
                        search,
                    },
                });
                setState(prevState => ({
                    ...prevState,
                    dataTable: data,
                }));
                setCurrentPage(page);
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

    const handleSubmit = async (data) => {
        // e.preventDefault();
        try {
            console.log("FROM FORM : ", data)
            const url = actionModal === 'EDIT' ? `${api}/${initialIdCurrent}` : api;
            const method = actionModal === 'EDIT' ? axios.put : axios.post;
            await method(url,data );
            toast.success(`${actionModal === 'EDIT' ? 'Cập nhật' : 'Thêm mới'} thành công!`);
            fetchData(searchTerm, currentPage);
            setFormData({
                subject_id: "",
                subject_name: "",
                status: "",
                training_duration: "",
                training_program_id: "",
            });
        } catch (error) {
            console.error(`Error ${actionModal.toLowerCase()} item:`, error);
            toast.error(`Failed to ${actionModal.toLowerCase()} item.`);
        }
    };

    useEffect(() => {
        if (actionModal === 'EDIT' || actionModal === 'VIEW') {
            axios.get(`${api}/${initialIdCurrent}`)
                .then(res => setFormData(res.data))
                .catch(err => console.error('Error fetching data:', err));
        }
    }, [actionModal, initialIdCurrent]);

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản lý học phí</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Home</li>
                                <li className="breadcrumb-item active">Quản lý học phí</li>
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
                                    <FormComponentWithValidation
                                        formFieldsProp={state.modalProps.formFieldsProp}
                                        initialData={formData}
                                        actionModal={actionModal}
                                        onSubmit={handleSubmit}
                                        onCancel={() => {
                                            setState(prev => ({ ...prev, modalShow: false }));
                                        }}
                                        statusOptions={statusOptions}
                                        programOptions={programOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="text-start mb-4">Danh sách học phí</h3>
                                    <div className="d-flex mb-4">
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
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter') {
                                                        event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
                                                        handleSearch(); // Gọi hàm tìm kiếm
                                                    }
                                                }}
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
                                    <Table className={state.classTable}>
                                        <thead>
                                        <tr>
                                            {COLUMNS.map((col, index) => (
                                                <th key={index}>{col}</th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {state.dataTable.map((item, index) => (
                                            <tr key={item.subject_id}>
                                                <td>{index + 10 * (currentPage - 1) + 1}</td>
                                                <td>{item.id_hoc_vien}</td>
                                                <td>{item.id_ctdt}</td>
                                                <td>{item.so_tien}</td>
                                                <td>{item.phuong_thuc_thanh_toan}</td>
                                                <td>{item.ngay_thanh_toan ? new Date(item.ngay_thanh_toan).toLocaleDateString() : 'N/A'}</td>
                                                <td className={item.trang_thai === 0 ? "text-success" : item.trang_thai === 1 ? "text-secondary" : ""}>
                                                    {statusOptions.find(status => status.id === item.trang_thai)?.name || 'N/A'}
                                                </td>
                                                <td>{item.ghi_chu || 'N/A'}</td>
                                                <td>
                                                    <Button
                                                        variant="light"
                                                        className="me-1"
                                                        onClick={() => {
                                                            setFormData(item)
                                                            setInitialIdCurrent(item.subject_id);
                                                            setActionModal('VIEW')
                                                        }}
                                                    >
                                                        <BsEye />
                                                    </Button>
                                                    <Button
                                                        variant="primary"
                                                        className="me-1"
                                                        onClick={() => {
                                                            setFormData(item)
                                                            setInitialIdCurrent(item.subject_id);
                                                            setActionModal('EDIT')
                                                        }}
                                                    >
                                                        <BsPencil />
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => confirmDelete(item)}
                                                    >
                                                        <BsTrash/>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
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

export default TuitionFeeComponent;


