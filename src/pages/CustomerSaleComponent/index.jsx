import axios from "axios";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Modal, Table} from "react-bootstrap";
import DeleteComponent from "../../components/DeleteItemComponent";
import PagingComponent from "../../components/PagingComponent";
import API from "../../store/Api";
import * as Yup from 'yup';
import {BsEye, BsPencil, BsTrash} from 'react-icons/bs';
import "./CustomerSaleComponent.scss";
import {toast, ToastContainer} from "react-toastify";
import CustomerSaleForm from "./CustomerSaleForm";
import {FaFileExport, FaFileImport, FaPlus, FaSync} from "react-icons/fa";
import ImportExcelForm from "./ImportExcelForm";
import AssignDataForm from "./AssignDataForm";

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
                name: "customer_name",
                type: "text",
                label: "Tên khách hàng",
                placeholder: "Nhập tên khách hàng",
                validation: Yup.string().required('Tên khách hàng là bắt buộc'),
            },
            {
                name: "gender",
                type: "select",
                label: "Giới tính",
                placeholder: "Chọn giới tính",
                apiUrl: "/data/gender.json",
                defaultOption: {value: "", label: "Chọn giới tính"},
                validation: Yup.string().required('Giới tính là bắt buộc'),
            },
            {
                name: "program_interest",
                type: "select",
                label: "Chương trình học quan tâm",
                placeholder: "Chọn chương trình học",
                apiUrl: "http://localhost:9001/api/v1/subjects/programs",
                defaultOption: {value: "", label: "Chọn chương trình học"},
                validation: Yup.string().required('Chương trình học là bắt buộc'),
            },
            {
                name: "record_time",
                type: "datetime",
                label: "Thời gian ghi nhận",
                placeholder: "Chọn thời gian",
                validation: Yup.date().required('Thời gian ghi nhận là bắt buộc'),
            },
            {
                name: "responsible_person",
                type: "text",
                label: "Người phụ trách",
                placeholder: "Chọn người phụ trách",
                apiUrl: "/data/responsible_person.json",
                defaultOption: {value: "", label: "Chọn người phụ trách"},
                validation: Yup.string().required('Người phụ trách là bắt buộc'),
            },
            {
                name: "phone_number",
                type: "text",
                label: "Số điện thoại",
                placeholder: "Nhập số điện thoại",
                validation: Yup.string().matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ').required('Số điện thoại là bắt buộc'),
            },
            {
                name: "source",
                type: "text",
                label: "Nguồn",
                placeholder: "Nhập nguồn",
                validation: Yup.string().required('Nguồn là bắt buộc'),
            },
            {
                name: "address",
                type: "text",
                label: "Địa chỉ (nếu cần)",
                placeholder: "Nhập địa chỉ",
                validation: Yup.string(),
            },
            {
                name: "note",
                type: "textarea",
                label: "Ghi chú",
                placeholder: "Nhập ghi chú",
                validation: Yup.string(),
            },
            {
                name: "trang_thai",
                type: "select",
                label: "Trạng thái",
                placeholder: "Chọn trạng thái",
                apiUrl: "/data/status.json",
                defaultOption: {value: "", label: "Chọn trạng thái"},
                validation: Yup.string().required('Trạng thái là bắt buộc'),
            },
        ],
        initialIsEdit: false,
        initialIdCurrent: null,
        api: API.SUBJECT,
    },
};
const COLUMNS = [
    "STT",
    "Tên khách hàng",
    "Giới tính",
    "Chương trình học quan tâm",
    "Thời gian ghi nhận",
    "Thời gian cập nhập",
    "Người phụ trách",
    "Số điện thoại",
    // "Nguồn",
    "Địa chỉ (nếu cần)",
    "Ghi chú",
    "Trạng thái",
    "",
];


const CustomerSaleComponent = () => {
    const [state, setState] = useState(INITIAL_STATE);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionModal, setActionModal] = useState("CREATE");
    const [initialIdCurrent, setInitialIdCurrent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusOptions, setStatusOptions] = useState([]);
    const [programOptions, setProgramOptions] = useState([]);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        customer_name: "",
        gender: "",
        program_interest: "",
        record_time: "",
        responsible_person: "",
        phone_number: "",
        source: "",
        address: "",
        note: "",
        trang_thai: "",
    });
    const api = API.SUBJECT;

    const fetchData = useCallback(
        async (search = "", page = 1) => {
            try {
                const {data} = await axios.get(`http://localhost:9001/api/v1/customers?search=${search}&page=${page - 1}`);
                setState(prevState => ({
                    ...prevState,
                    dataTable: data.data.content,
                }));
                setCurrentPage(page);
                // console.log("DATA" + JSON.stringify(data.data.totalPages))
                setTotalPages(data.data.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        [api]
    );

    const fetchOptions = useCallback(async () => {
        try {
            const [statusResponse, programResponse, paymentResponse] = await Promise.all([
                axios.get("/data/status.json"),
                axios.get("http://localhost:9001/api/v1/subjects/programs"),
                axios.get("/data/phuongthucthanhtoan.json")
            ]);
            setStatusOptions(statusResponse.data.data);
            setProgramOptions(programResponse.data.data);
            setPaymentOptions(paymentResponse.data);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    }, []);

    useEffect(() => {
        fetchData("", currentPage);
        fetchOptions();
    }, [fetchData, currentPage, fetchOptions]);
    const handleSearch = () => {
        fetchData(state.searchTerm, currentPage);
    };
    const handleEdit = (id) => {
        setInitialIdCurrent(id);
        setActionModal("EDIT");
        setState(prevState => ({
            ...prevState,
            modalShow: true
        }));
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${api}/${id}`);
            toast.success("Xóa thành công!");
            fetchData();
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("Failed to delete item.");
        } finally {
            setShowConfirmModal(false);
        }
    };
    const handleSubmit = async (data) => {
        try {
            const url = actionModal === 'EDIT' ? `${api}/${initialIdCurrent}` : api;
            const method = actionModal === 'EDIT' ? axios.put : axios.post;
            await method(url, data);
            toast.success(`${actionModal === 'EDIT' ? 'Cập nhật' : 'Thêm mới'} thành công!`);
            fetchData();
            setState(prevState => ({...prevState, modalShow: false}));
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

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const confirmDelete = (item) => {
        setDeleteItemId(item.subject_id);
        setShowConfirmModal(true);
    };

    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản lý khách hàng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Home</li>
                                <li className="breadcrumb-item active">Quản lý khách hàng</li>
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
                                    <div className="d-flex align-items-start justify-content-between">
                                        <h3 className="text-start mb-4">Danh sách khách hàng</h3>
                                        <div className="d-flex align-items-center gap-3 mb-4">
                                            <Button variant="primary" className="d-flex align-items-center"
                                                    onClick={() => {
                                                        setActionModal("CREATE");
                                                        setState(prevState => ({
                                                            ...prevState,
                                                            modalShow: true
                                                        }));
                                                    }}>
                                                <FaPlus className="me-2"/> Add
                                            </Button>
                                            <div className="vr mx-2"/>
                                            <Button variant="warning" className="d-flex align-items-center"
                                                    onClick={() => {
                                                        setActionModal('ASSIGN');
                                                        setState(prevState => ({
                                                            ...prevState,
                                                            modalShow: true
                                                        }));
                                                    }}>
                                                <FaSync className="me-2"/> Giao việc
                                            </Button>
                                            <div className="vr mx-2"/>
                                            <Button variant="secondary" className="d-flex align-items-center"
                                                    onClick={() => {
                                                        setActionModal("IMPORT");
                                                        setState(prevState => ({
                                                            ...prevState,
                                                            modalShow: true
                                                        }));
                                                    }}>
                                                <FaFileImport className="me-2"/> Import
                                            </Button>
                                            <Button variant="success" className="d-flex align-items-center"
                                                    href="/path/to/sample-file.xlsx"
                                                    download
                                            >
                                                <FaFileExport className="me-2"/> Export
                                            </Button>


                                        </div>
                                    </div>
                                    <div className="d-flex mb-4">
                                        <div className="col-md-8 d-flex align-items-center gap-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <Form.Select
                                                    id="programStatus1"
                                                    aria-label="Status"
                                                    className="form-select rounded-pill border-secondary flex-fill "
                                                    value={state.modalProps.formFieldsProp.status}
                                                    onChange={(e) => setState(prevState => ({
                                                        ...prevState,
                                                        modalProps: {
                                                            ...prevState.modalProps,
                                                            status: e.target.value
                                                        }
                                                    }))}
                                                >
                                                    <option value="">Chọn trạng thái</option>
                                                    {statusOptions.map((option) => (
                                                        <option key={option.value}
                                                                value={option.id}>{option.name}</option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Select
                                                    id="staff"
                                                    aria-label="staff"
                                                    className="form-select rounded-pill border-secondary flex-fill "
                                                    value={state.modalProps.formFieldsProp.status}
                                                    onChange={(e) => setState(prevState => ({
                                                        ...prevState,
                                                        modalProps: {
                                                            ...prevState.modalProps,
                                                            status: e.target.value
                                                        }
                                                    }))}
                                                >
                                                    <option value="">Chọn nhân viên</option>
                                                    {statusOptions.map((option) => (
                                                        <option key={option.value}
                                                                value={option.id}>{option.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </div>

                                            <div className="d-flex align-items-center gap-2">
                                                <h6 className="mb-0">Từ:</h6>
                                                <div className="flex-fill">
                                                    <label htmlFor="fromDate" className="form-label sr-only">Ngày bắt
                                                        đầu</label>
                                                    <input
                                                        type="date"
                                                        id="fromDate"
                                                        className="form-control rounded-pill border-secondary"
                                                        value={state.modalProps.formFieldsProp.fromDate}
                                                        onChange={(e) => setState(prevState => ({
                                                            ...prevState,
                                                            modalProps: {
                                                                ...prevState.modalProps,
                                                                fromDate: e.target.value
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center gap-2">
                                                <h6 className="mb-0">Đến:</h6>
                                                <div className="flex-fill">
                                                    <label htmlFor="toDate" className="form-label sr-only">Ngày kết
                                                        thúc</label>
                                                    <input
                                                        type="date"
                                                        id="toDate"
                                                        className="form-control rounded-pill border-secondary"
                                                        value={state.modalProps.formFieldsProp.toDate}
                                                        onChange={(e) => setState(prevState => ({
                                                            ...prevState,
                                                            modalProps: {
                                                                ...prevState.modalProps,
                                                                toDate: e.target.value
                                                            }
                                                        }))}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="col-md-4  d-flex align-items-center gap-3">
                                            <input
                                                type="text"
                                                className="form-control rounded-pill border-secondary flex-fill"
                                                placeholder="Search..."
                                                aria-label="Search input"
                                                value={state.searchTerm}
                                                onChange={(e) => setState(prevState => ({
                                                    ...prevState,
                                                    searchTerm: e.target.value
                                                }))}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter') {
                                                        event.preventDefault();
                                                        handleSearch();
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
                                            <tr key={item.id}>
                                                {/* Display the current index adjusted for pagination */}
                                                <td>{index + 10 * (currentPage - 1) + 1}</td>

                                                {/* Display the program interest name */}
                                                <td>{item.customer_name}</td>

                                                {/* Gender: you can format this based on the gender value */}
                                                <td>{item.gender === "1" ? "Male" : "Female"}</td>

                                                {/* Display the program_interest */}
                                                <td>{item.program_interest}</td>

                                                {/* Created at */}
                                                <td>{new Date(item.createdAt).toLocaleString()}</td>

                                                {/* Updated at */}
                                                <td>{new Date(item.updatedAt).toLocaleString()}</td>

                                                {/* Display the responsible person */}
                                                <td>{item.responsible_person}</td>

                                                {/* Display the phone number */}
                                                <td>{item.phone_number}</td>

                                                {/*/!* Facebook link *!/*/}
                                                {/*<td>*/}
                                                {/*    <a href={`https://${item.facebookLink}`} target="_blank"*/}
                                                {/*       rel="noopener noreferrer">*/}
                                                {/*        {item.facebookLink}*/}
                                                {/*    </a>*/}
                                                {/*</td>*/}


                                                {/* Display the address */}
                                                <td>{item.address}</td>

                                                {/* Display the address */}
                                                <td>{item.note}</td>


                                                {/* Status (active, inactive, etc.) */}
                                                <td>{item.status === 1 ? "Active" : "Inactive"}</td>

                                                <td className="text-center">
                                                    <div
                                                        className="d-flex flex-row flex-md-column justify-content-center gap-2">
                                                        <Button variant="link" onClick={() => handleEdit(item.id)}>
                                                            <BsEye className="text-secondary"/>
                                                        </Button>
                                                        <Button variant="link" onClick={() => handleEdit(item.id)}>
                                                            <BsPencil className="text-primary"/>
                                                        </Button>
                                                        <Button variant="link" onClick={() => confirmDelete(item)}>
                                                            <BsTrash className="text-danger"/>
                                                        </Button>
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}

                                        </tbody>
                                    </Table>
                                    {/* Phân trang */}
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-auto">
                                            <PagingComponent
                                                currentPage={currentPage}
                                                totalPage={totalPages}
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

            {/* Modal for Form */}
            <Modal show={state.modalShow} onHide={() => setState(prevState => ({...prevState, modalShow: false}))}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {actionModal === "EDIT" ? "Cập Nhật" : actionModal === 'IMPORT' ? "Nhập từ Excel" :
                            actionModal === 'EXPORT' ? "Xuất file Excel" :
                                actionModal === 'ASSIGN' ? "Phân chia dữ liệu cho nhân viên" : "Thêm mới"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {actionModal === 'IMPORT' ? <ImportExcelForm/> :
                        actionModal === 'ASSIGN' ? <AssignDataForm/> : <CustomerSaleForm
                            formFieldsProp={state.modalProps.formFieldsProp}
                            initialData={formData}
                            actionModal={actionModal}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setState(prev => ({...prev, modalShow: false}));
                            }}
                            statusOptions={statusOptions}
                            programOptions={programOptions}
                        />}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

            {/* Confirmation Modal */}
            <DeleteComponent
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onDelete={() => handleDelete(deleteItemId)}
            />

            <ToastContainer/>
        </>
    );
};

export default CustomerSaleComponent;
