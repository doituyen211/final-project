import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import TableComponents from '../../components/TableComponent';
import SelectDropdown from '../../components/SelectDownButton';
import PagingComponent from '../../components/PagingComponent';
import API from '../../store/Api';
import FormComponent from "../../components/FormComponent";
import DeleteComponent from "../../components/DeleteItemComponent";

// Hằng số định nghĩa trạng thái khởi tạo và các cột của bảng
const INITIAL_STATE = {
    dataTable: [], // Dữ liệu bảng
    titleTable: 'SubjectComponent', // Tiêu đề của bảng
    classTable: 'table table-bordered table-hover', // Lớp CSS của bảng
    modalShow: false, // Trạng thái hiển thị modal
    modalProps: {
        show: false,
        action: '',
        formFieldsProp: [
            {name: 'nam_khoa_hoc', type: 'text', label: 'Năm khóa học', placeholder: 'Nhập năm khóa học'},
        ],
        initialIsEdit: false,
        initialIdCurrent: null,
        api: API.COURSE
    }
};

// Các cột của bảng
const COLUMNS = ['STT', 'Năm khóa học', 'Trạng thái', ''];

const SubjectComponent2 = () => {
    const [state, setState] = useState(INITIAL_STATE);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionModal, setActionModal] = useState('CREATE');
    const [initialIdCurrent, setInitialIdCurrent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const api = API.COURSE;

    const fetchData = useCallback(async (search = '', page = 1) => {
        try {
            const {data} = await axios.get(api, {
                params: {
                    page: page,
                    pageSize: 10,
                    search
                }
            });
            setState(prevState => ({
                ...prevState,
                dataTable: data.content
            }));
            setCurrentPage(data.page);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    }, [api]);
    //Search
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        fetchData(searchTerm);
    }, [fetchData, searchTerm]);

    useEffect(() => {
        fetchData('', currentPage);
        console.log('Render SubjectComponent');
    }, [fetchData, currentPage]);

    const handlePageChange = useCallback(pageNumber => {
        setCurrentPage(pageNumber);
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

    // Hàm xử lý xác nhận xóa
    const confirmDelete = (item) => {
        setDeleteItemId(item.ma_khoa_hoc);
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
                            <h1>Quản lý Khóa học</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <button onClick={() => console.log('Home clicked')}>Home</button>
                                </li>
                                <li className="breadcrumb-item active">Quản lý khóa học</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        {/* Card cho Form Component */}
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <FormComponent
                                        title={actionModal === 'EDIT' ? 'Cập Nhật' : actionModal === 'CREATE' ? 'Thêm Mới' : 'Chi tiết'}
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

                        {/* Card cho các bộ lọc, ô tìm kiếm và nút thêm mới */}
                        <div className="col-md-9">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row mb-4">
                                        {/* Bộ lọc */}
                                        <div className="col-md-4 d-flex align-items-center gap-3">
                                            {/* <SelectDropdown
                                                id="programStatus1"
                                                defaultOption={{value: '', label: 'Chọn trạng thái'}}
                                                apiUrl="/data/status.json"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                            /> */}
                                            {/* <SelectDropdown
                                                id="programStatus2"
                                                defaultOption={{value: '', label: 'Chọn chương trình học'}}
                                                apiUrl="/data/status.json"
                                                className="form-select rounded-pill border-secondary flex-fill"
                                            /> */}
                                        </div>

                                        {/* Ô tìm kiếm và nút tìm kiếm */}
                                        <div className="col-md-4 d-flex align-items-center gap-3">
                                            <input
                                                type="text"
                                                className="form-control rounded-pill border-secondary flex-fill"
                                                placeholder="Tìm kiếm . . ."
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
                                        {/* Nút thêm mới */}
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

                                    {/* Bảng dữ liệu */}
                                    <TableComponents
                                        cols={COLUMNS}
                                        dataTable={state.dataTable}
                                        classTable={state.classTable}
                                        api={api}
                                        formFieldsProp={state.modalProps.formFieldsProp}
                                        getData={fetchData}
                                        actionView={(khoa_hoc) => {
                                            setInitialIdCurrent(khoa_hoc.ma_khoa_hoc);
                                            setActionModal('VIEW');
                                        }}
                                        actionEdit={(khoa_hoc) => {
                                            setInitialIdCurrent(khoa_hoc.ma_khoa_hoc);
                                            setActionModal('EDIT');
                                        }}
                                        actionDelete={confirmDelete}
                                        useModal={false}
                                        currentPage={currentPage}
                                    />

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
}

export default SubjectComponent2;
