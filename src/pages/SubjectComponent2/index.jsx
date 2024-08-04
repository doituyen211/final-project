import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import TableComponents from '../../components/TableComponent';
import SelectDropdown from '../../components/SelectDownButton';
import PagingComponent from '../../components/PagingComponent';
import API from '../../store/Api';
import FormComponent from "../../components/FormComponent";

// Hằng số định nghĩa trạng thái khởi tạo và các cột của bảng
const INITIAL_STATE = {
    dataTable: [], // Dữ liệu bảng
    titleTable: 'SubjectComponent', // Tiêu đề của bảng
    classTable: 'table table-bordered table-hover', // Lớp CSS của bảng
    totalPage: 5, // Tổng số trang
    currentPage: 1, // Trang hiện tại
    modalShow: false, // Trạng thái hiển thị modal
    modalProps: {
        show: false,
        action: '',
        formFieldsProp: [
            {name: 'name', type: 'text', label: 'Name', placeholder: 'Enter the name'},
            {name: 'duration', type: 'text', label: 'Duration', placeholder: 'Enter duration'},
            {
                name: 'programName',
                type: 'select',
                label: 'Program Name',
                placeholder: 'Select a program',
                apiUrl: '/data/status.json',
                defaultOption: {value: '', label: 'Select a program'}
            },
            {
                name: 'status',
                type: 'select',
                label: 'Status',
                placeholder: 'Select status',
                apiUrl: '/data/status.json',
                defaultOption: {value: '', label: 'Select status'}
            }
        ],
        initialIsEdit: false,
        initialIdCurrent: null,
        api: API.SUBJECT
    }
};

const COLUMNS = ['STT', 'Mã môn học', 'Tên môn học', 'Thời lượng', 'Tên chương trình học', 'Trạng thái', ''];

const SubjectComponent2 = () => {
    const [state, setState] = useState(INITIAL_STATE);

    const api = API.SUBJECT;

    // Hàm lấy dữ liệu từ API
    const fetchData = useCallback(async () => {
        try {
            const {data} = await axios.get(api);
            setState(prevState => ({
                ...prevState,
                dataTable: data,
                currentPage: 1
            }));
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    }, [api]);

    useEffect(() => {
        fetchData();
        console.log('Render SubjectComponent');
    }, [fetchData]);

    // Hàm xử lý thay đổi trang
    const handlePageChange = useCallback(pageNumber => {
        setState(prevState => ({...prevState, currentPage: pageNumber}));
    }, []);

    // Hàm xử lý lưu dữ liệu
    const handleSave = useCallback(formData => {
        console.log('Đang lưu dữ liệu...');
        console.log('Dữ liệu biểu mẫu:', formData);
        // Thêm logic lưu dữ liệu ở đây
    }, []);

    // Hàm hiển thị modal
    const handleModalShow = useCallback(() => {
        setState(prevState => ({
            ...prevState,
            modalShow: true,
            modalProps: {
                ...prevState.modalProps,
                show: true,
                onHide: () => setState(prevState => ({...prevState, modalShow: false})),
                onSave: handleSave,
                action: 'CREATE',
                initialIsEdit: true,
                initialIdCurrent: null
            }
        }));
    }, [handleSave]);

    const [actionModal, setActionModal] = useState('CREATE');
    const [initialIdCurrent, setInitialIdCurrent] = useState(null);


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
                                <li className="breadcrumb-item">
                                    <button onClick={() => console.log('Home clicked')}>Home</button>
                                </li>
                                <li className="breadcrumb-item active">Quản lý môn học</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        {/* Form Component Card */}
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <FormComponent
                                        title={actionModal === 'EDIT' ?
                                            'Cập Nhật' : actionModal === 'CREATE' ? 'Thêm Mới' : 'Chi tiết'}
                                        fields={state.modalProps.formFieldsProp}
                                        getData={fetchData}
                                        action={actionModal}
                                        idCurrent={initialIdCurrent}
                                        onClose={() => {
                                        }}
                                        api={api}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Filters, Search Input and Button, Add New Button Card */}
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row mb-4">
                                        {/* Filters */}
                                        <div className="col-md-4 d-flex align-items-center gap-3">
                                            <SelectDropdown
                                                id="programStatus1"
                                                defaultOption={{value: '', label: 'Chọn trạng thái'}}
                                                apiUrl="/data/status.json"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                            />
                                            <SelectDropdown
                                                id="programStatus2"
                                                defaultOption={{value: '', label: 'Chọn chương trình học'}}
                                                apiUrl="/data/status.json"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                            />
                                        </div>

                                        {/* Search Input and Button */}
                                        <div className="col-md-4 d-flex align-items-center gap-3">
                                            <input
                                                type="text"
                                                className="form-control rounded-pill border-secondary flex-fill"
                                                placeholder="Search..."
                                                aria-label="Search input"
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                aria-label="Search"
                                                className="d-flex align-items-center px-3 rounded-pill"
                                            >
                                                <i className="bi bi-search"></i>
                                            </Button>
                                        </div>

                                        {/* Add New Button */}
                                        <div className="col-md-4 d-flex align-items-center justify-content-end">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={handleModalShow}
                                                aria-label="Add new item"
                                                className="d-flex align-items-center px-3 rounded-pill"
                                            >
                                                <i className="bi bi-plus-circle me-2"></i>
                                                Add New
                                            </Button>
                                        </div>
                                    </div>
                                    <TableComponents
                                        cols={COLUMNS}
                                        dataTable={state.dataTable}
                                        classTable={state.classTable}
                                        api={api}
                                        formFieldsProp={state.modalProps.formFieldsProp}
                                        getData={fetchData}
                                        actionView={(data) => {
                                            setInitialIdCurrent(data);
                                            setActionModal('VIEW');
                                        }}
                                        actionEdit={(data) => {
                                            setInitialIdCurrent(data);
                                            setActionModal('EDIT');
                                        }}
                                        useModal={false}
                                    />
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-auto">
                                            <PagingComponent
                                                totalPage={state.totalPage}
                                                currentPage={state.currentPage}
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


        </>
    );
}

export default SubjectComponent2;
