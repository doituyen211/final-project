import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import DeleteComponent from "../../components/DeleteItemComponent";
import PagingComponent from "../../components/PagingComponent";
import API from "../../store/Api";
import FormComponentWithValidation from "./FormComponentWithValidation";
import * as Yup from 'yup';
import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';
import { toast, ToastContainer } from "react-toastify";
import Input from "../../components/InputComponents";

const INITIAL_STATE = {
    dataTable: [],
    titleTable: "ClassMembersComponent",
    classTable: "table table-bordered table-hover",
    modalShow: false,
    modalProps: {
        show: false,
        action: "",
        formFieldsProp: [
            {
                name: "student_id",
                type: "number",
                label: "Mã học viên",
                placeholder: "Nhập mã học viên",

            },
            {
                name: "class_id",
                type: "number",
                label: "Mã lớp",
                placeholder: "Nhập mã lớp",

            },
            {
                name: "status",
                type: "select",
                label: "Trạng thái",
                placeholder: "Chọn trạng thái",
                options: [
                    { value: "", label: "Chọn trạng thái" },
                    { value: 1, label: "Đang học" },  // Sử dụng số thay vì chuỗi
                    { value: 2, label: "Hoàn thành" },  // Sử dụng số thay vì chuỗi
                  ],
            },
        ],
        initialIsEdit: false,
        initialIdCurrent: null,
        api: API.CLASSMEMBERS,
    },
};

const COLUMNS = [
    "STT",
    "Mã học viên",
    "Mã lớp",
    "Trạng thái",
    "",
];

const ClassMembersComponent = () => {
    const [state, setState] = useState(INITIAL_STATE);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionModal, setActionModal] = useState("CREATE");
    const [initialIdCurrent, setInitialIdCurrent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [idclass, setIdclass] = useState("");
    const [status, setStatus] = useState("");
    const [idstudent, setIdstudent] = useState("");
    const [searchTerm, setSearchTerm] = useState("");


    const [statusOptions, setStatusOptions] = useState([]);
    const [idstudentOptions, setIdstudentOptions] = useState([]);
    const [idclassOptions, setIdclassOptions] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        student_id: "",
        class_id: "",
        status: "",
    });

    const api = API.CLASSMEMBERS;

    // Fetch data with optional filters
    const fetchData = useCallback(
        async (search = "", page = 1) => {
            try {
                if (search !== "" || status !== "" || idclass !== ""|| idstudent !== "") page = 1;
    
                console.log("Fetching data with:", { page, pageSize: 10, search, status, classid: idclass,studentid:idstudent });
    
                const { data } = await axios.get(api, {
                    params: {
                        page: page,
                        pageSize: 10,
                        search,
                        status,
                        classid: idclass,
                        studentid:idstudent, // Đảm bảo ma_lop được gửi đúng
                    },
                });
    
                console.log("Data fetched:", data); // Kiểm tra dữ liệu trả về từ API
    
                setState(prevState => ({
                    ...prevState,
                    dataTable: data.content,
                }));
                setCurrentPage(data.page);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        [api, status, idclass,idstudent] // Đảm bảo fetchData phụ thuộc vào idclass
    );
    
    
    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        fetchData(searchTerm);
    }, [fetchData, searchTerm]);

    const handleIdstudentChange = useCallback((event) => {
        setIdstudent(event.target.value);
    }, []);
    const handleIdclassChange = useCallback((event) => {
        const selectedClassId = event.target.value;
        console.log("Selected class ID:", selectedClassId); // Thêm log để kiểm tra
        setIdclass(selectedClassId);
        fetchData(searchTerm, 1);
    }, [fetchData, searchTerm]);

    const handleStatusChange = useCallback((event) => {
        setStatus(event.target.value);
    }, []);

    // useEffect(() => {

    //     fetchData("", currentPage);
    //     fetchOptions();
    // }, [fetchData, currentPage]);
    useEffect(() => {
        fetchData("", currentPage);
        fetchOptions();
        console.log("Class ID changed:", idclass); // Thêm log để kiểm tra
        fetchData(searchTerm, 1);
    }, [idclass, fetchData, searchTerm ,fetchData, currentPage]);
    

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const fetchOptions = useCallback(async () => {
        try {
            // Fetch the paginated class members data
            const response = await axios.get(API.CLASSMEMBERS, {
                params: { page: 1, pageSize: 10 } // Adjust params as necessary
            });

            const data = response.data.content;

            // Extract unique status options
            const statusOptions = Array.from(new Set(data.map(item => item.status)))
                .map(status => ({
                    value: status,
                    label: status === 1 ? 'Đang học' : 'Hoàn thành'
                }));

            const idstudentOptions = Array.from(new Set(data.map(item => item.student_id)))
                .map(student_id => ({
                    value: student_id,
                    label: student_id.toString()
                }));

            const idclassOptions = Array.from(new Set(data.map(item => item.class_id)))
                .map(class_id => ({
                    value: class_id,
                    label: class_id.toString()
                }));

            // Update the state with the new options
            setStatusOptions(statusOptions);
            setIdstudentOptions(idstudentOptions);
            setIdclassOptions(idclassOptions);

        } catch (error) {
            console.error("Error fetching options:", error);
        }
    }, []);

    // Hàm xử lý xác nhận xóa
    const confirmDelete = (item) => {
        setDeleteItemId(item.id);
        setShowConfirmModal(true);
    };

    const handleSubmit = async (data) => {
        try {
            console.log("FROM FORM : ", data)
            const url = actionModal === 'EDIT' ? `${api}/${initialIdCurrent}` : api;
            const method = actionModal === 'EDIT' ? axios.put : axios.post;
            await method(url, data);
            toast.success(`${actionModal === 'EDIT' ? 'Cập nhật' : 'Thêm mới'} thành công!`);
            fetchData(searchTerm, currentPage);
            setFormData({
                id: "",
                student_id: "",
                class_id: "",
                status: "",
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
                            <h1>Quản lý thành viên lớp</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Home</li>
                                <li className="breadcrumb-item active">Quản lý thành viên lớp</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                         <div className="col-md-3">
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
                                        // statusOptions={statusOptions}
                                        // programOptions={programOptions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="text-start mb-4">Danh sách thành viên lớp</h3>
                                    <div className="d-flex mb-4">
                                        {/* Bộ lọc */}
                                        <div className="col-md-3 d-flex align-items-center gap-3">
                                            <Form.Select
                                                id="programStatus2"
                                                aria-label="Program"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                                value={idclass}
                                                onChange={handleIdclassChange}
                                            >
                                                {/* <option value="">
                                                    Tên lớp - Mã lớp
                                                </option> */}
                                                <option value="">
                                                    Mã lớp
                                                </option>
                                                {/* Kiểm tra dữ liệu trả về */}
                                                {idclassOptions.map(option => (
                                                    <option
                                                        key={option.value} // Use value as key
                                                        value={option.value} // Use value as the option value
                                                    >
                                                        {option.label} {/* Display label */}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center gap-3"></div>
                                        <div className="col-md-7 d-flex align-items-center gap-3">
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
                                    <div className="d-flex mb-4">
                                        <div className="col-md-3 d-flex align-items-center gap-3"></div>
                                        <div className="col-md-3 d-flex align-items-center gap-3">
                                            <Form.Select
                                                id="statusSelect"
                                                aria-label="Status"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                                value={status}
                                                onChange={handleStatusChange}
                                            >
                                                <option value="">Chọn trạng thái</option>
                                                {statusOptions.map(option => (
                                                    <option
                                                        key={option.value} // Use value as key
                                                        value={option.value} // Use value as the option value
                                                    >
                                                        {option.label} {/* Display label */}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                        <div className="col-md-3 d-flex align-items-center gap-3">
                                            <Form.Select
                                                id="programStatus1"
                                                aria-label="Status"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                                value={idstudent}
                                                onChange={handleIdstudentChange}
                                            >
                                                <option value="">
                                                    Chọn học viên
                                                </option>
                                                {idstudentOptions.map(option => (
                                                    <option
                                                        key={option.value} // Use value as key
                                                        value={option.value} // Use value as the option value
                                                    >
                                                        {option.label} {/* Display label */}
                                                    </option>
                                                ))}
                                            </Form.Select>
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
                                                <tr key={item.id}>
                                                    <td>{index + 10 * (currentPage - 1) + 1}</td>
                                                    <td>{item.student_id}</td>
                                                    <td>{item.class_id}</td>
                                                    <td className={
                                                        item.status === 1 ? "text-success" :
                                                        item.status === 2 ? "text-secondary" : ""
                                                    }>
                                                        {item.status === 1 ? 'Đang học' :
                                                         item.status === 2 ? 'Hoàn thành' : 'N/A'}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="light"
                                                            className="me-1"
                                                            onClick={() => {
                                                                setFormData(item)
                                                                setInitialIdCurrent(item.id);
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
                                                                setInitialIdCurrent(item.id);
                                                                setActionModal('EDIT')
                                                            }}
                                                        >
                                                            <BsPencil />
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => confirmDelete(item)}
                                                        >
                                                            <BsTrash />
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

export default ClassMembersComponent;
