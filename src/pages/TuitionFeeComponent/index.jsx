import axios from "axios";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Table} from "react-bootstrap";
import DeleteComponent from "../../components/DeleteItemComponent";
import PagingComponent from "../../components/PagingComponent";
import API from "../../store/Api";
import * as Yup from 'yup';
import {BsEye, BsPencil, BsTrash} from 'react-icons/bs';
import "./TuitionFeeComponent.scss";
import {toast, ToastContainer} from "react-toastify";
import TuitionFeeForm from "./TuitionFeeForm";

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
                name: "id_ctdt",
                type: "select",
                label: "Chương trình đào tạo",
                placeholder: "Nhập ID chương trình đào tạo",
                apiUrl: "/data/program.json",
                defaultOption: { value: "", label: "Chọn 1 chương trình đào tạo" },
                validation: Yup.string().required('Tên chương trình là bắt buộc '),
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
                type: "checkbox",
                label: "Phương thức thanh toán",
                placeholder: "Chon phương thức thanh toán",
                apiUrl: "/data/phuongthucthanhtoan.json",
                defaultOption: { value: "", label: "Chon phương thức thanh toán" },
                validation: Yup.string().required('Phuong thuc thanh toan là bắt buộc '),
            },

            {
                name: "trang_thai",
                type: "text",
                label: "Trạng thái",
                placeholder: "Nhập ghi chú",
                validation: Yup.string(),
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
    "ID Chương trình đào tạo", // ID of the training program
    "Số tiền",                // Amount of payment
    "Phương thức thanh toán chấp nhận",  // Payment method
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
    const [hocvienOptions, setHocvienOptions] = useState([]);
    const [paymentOptions, setPaymentOptions] = useState([]);
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
                const { data } = await axios.get(`https://66aa0b5b613eced4eba7559a.mockapi.io/tuitiofee?search=${search}&page=${page}&limit=5`);
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
            const [statusResponse, programResponse, paymentResponse] = await Promise.all([
                axios.get("/data/status.json"),
                axios.get("/data/program.json"),
                axios.get("/data/phuongthucthanhtoan.json")
            ]);
            setStatusOptions(statusResponse.data);
            setProgramOptions(programResponse.data);
            setPaymentOptions(paymentResponse.data);
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
                                    <TuitionFeeForm
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
                                        {/*<div className="col-md-3 d-flex align-items-center gap-3">*/}
                                        {/*    <Form.Select*/}
                                        {/*        id="programStatus2"*/}
                                        {/*        aria-label="Program"*/}
                                        {/*        className="form-select rounded-pill border-secondary flex-fill"*/}
                                        {/*        value={program}*/}
                                        {/*        onChange={handleProgramChange}*/}
                                        {/*    >*/}
                                        {/*        <option value="">*/}
                                        {/*            Chọn chương trình học*/}
                                        {/*        </option>*/}
                                        {/*        {programOptions.map(*/}
                                        {/*            (option) => (*/}
                                        {/*                <option*/}
                                        {/*                    key={option.value}*/}
                                        {/*                    value={option.id}*/}
                                        {/*                >*/}
                                        {/*                    {option.name}*/}
                                        {/*                </option>*/}
                                        {/*            )*/}
                                        {/*        )}*/}
                                        {/*    </Form.Select>*/}
                                        {/*</div>*/}
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
                                                <td>
                                                    {programOptions.find(program => program.id === item.id_ctdt)?.name || 'N/A'}
                                                </td>
                                                <td>{item.so_tien}</td>
                                                <td>
                                                    {item.phuong_thuc_thanh_toan
                                                        .map(value => {
                                                            const paymentMethod = paymentOptions.find(payment => payment.id === value);
                                                            return paymentMethod ? paymentMethod.name : 'N/A';
                                                        })
                                                        .join(', ')}
                                                </td>
                                                {/*<td>{item.ngay_thanh_toan ? new Date(item.ngay_thanh_toan).toLocaleDateString() : 'N/A'}</td>*/}
                                                <td >
                                                    {item.trang_thai}
                                                </td>
                                                <td>{item.ghi_chu || ''}</td>
                                                <td className="d-flex col-2">
                                                    <Button
                                                        variant="link"
                                                        className="me-1"
                                                        onClick={() => {
                                                            setFormData(item)
                                                            setInitialIdCurrent(item.subject_id);
                                                            setActionModal('VIEW')
                                                        }}
                                                    >
                                                        <BsEye className="text-secondary"/>
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        className="me-1"
                                                        onClick={() => {
                                                            setFormData(item)
                                                            setInitialIdCurrent(item.subject_id);
                                                            setActionModal('EDIT')
                                                        }}
                                                    >
                                                        <BsPencil className="text-primary" />
                                                    </Button>
                                                    <Button
                                                        variant="link"
                                                        onClick={() => confirmDelete(item)}
                                                    >
                                                        <BsTrash  className="text-danger"/>
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


