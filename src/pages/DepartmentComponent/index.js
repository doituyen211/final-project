import React, { useEffect, useState } from 'react'
import './sass/main.scss'
import InfoModal from './ModalDepartment/InfoDepartment';
import { createDepartment, deleteDepartment, fetchDepartmentById, fetchDepartments, fetchStatus, updateDepartment } from './service/DepartmentService';
import { convertDateToISO, formatDate } from './Utils/Date';
import DepartmentForm from './Utils/DepartmentForm';
import DepartmentTable from './Utils/DepartmentTable';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateDepartmentForm } from './Utils/ValidationDepartment';



export default function DepartmentComponent() {
    const ITEMS_PER_PAGE = 6;
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '' });
    const [formValue, setFormValue] = useState({
        departmentName: "",
        description: "",
        status: "",
        createDate: "",
        updateDate: "",
    })
    const [editingDepartmentId, setEditingDepartmentId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDepartments();
            setDepartments(data);
        };
        fetchData();
    }, [])
    useEffect(() => {
        const fetchStatuses = async () => {
            const data = await fetchStatus();
            setStatuses(data);
        };
        fetchStatuses();
    }, [])
    const [search, setSearch] = useState('');
    const closeModal = () => setModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateDepartmentForm(formValue, departments,editingDepartmentId);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const createDateISO = formatDate(formValue.createDate);
        const updateDateISO = formatDate(formValue.updateDate);
        const departmentData = {
            departmentName: formValue.departmentName,
            description: formValue.description,
            status: formValue.status,
            createDate: createDateISO,
            updateDate: updateDateISO
        };
        try {
            let res;
            if (isEditing) {
                res = await updateDepartment(editingDepartmentId, departmentData);
                setIsEditing(false);
            } else {
                res = await createDepartment(departmentData);
            }
            if (res) {
                setDepartments(isEditing ? departments.map(dep => dep.id === editingDepartmentId ? res : dep) : [...departments, res]);
                toast.success(isEditing ? "Cập nhật phòng ban thành công!" : "Thêm mới phòng ban thành công!")
                setFormValue({
                    departmentName: "",
                    description: "",
                    status: "",
                    createDate: "",
                    updateDate: "",
                });
                setEditingDepartmentId(null);
                setErrors({});
            }
        } catch (error) {
            console.error("Error adding or updating department:", error);
            setErrors(error.response?.data?.errors || {});
        }
    };
    const handleModalInfo = async (item) => {
        const departmentId = item.data[0];
        const department = await fetchDepartmentById(departmentId);
        if (department) {
            setModalContent({
                title: 'Thông tin phòng ban',
                content: (
                    <div>
                        <div className="form-group">
                            <label htmlFor="department_Id">ID:</label>
                            <input type="number" id="department_Id" className="form-control" value={department.id} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_Name">Tên phòng ban:</label>
                            <input type="text" id="department_Name" className="form-control" value={department.departmentName} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_Status">Trạng thái:</label>
                            <input type="text" id="department_Status" className="form-control" value={department.status} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_Description">Mô tả:</label>
                            <input type="text" id="department_Description" className="form-control" value={department.description} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_CreateDate">Ngày tạo:</label>
                            <input type="text" id="department_CreateDate" className="form-control" value={department.createDate} disabled />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department_UpdateDate">Ngày cập nhật:</label>
                            <input type="text" id="department_UpdateDate" className="form-control" value={department.updateDate} disabled />
                        </div>
                    </div>
                )
            });
            setModalOpen(true);
        }
    };
    const handleUpdateDepartment = async (item) => {
        const departmentId = item.data[0];
        const department = await fetchDepartmentById(departmentId);
        if (department) {
            setFormValue({
                departmentName: department.departmentName,
                description: department.description,
                status: department.status,
                createDate: convertDateToISO(department.createDate),
                updateDate: convertDateToISO(department.updateDate)
            });
            setEditingDepartmentId(departmentId);
            setIsEditing(true);
            setErrors({});
        }
    };
    const handleDeleteDepartment = async (item) => {
        const departmentId = item.data[0];
        const confirmDelete = window.confirm(`Bán muôn xóa phòng ban này khong?`);
        if (confirmDelete) {
            try {
                await deleteDepartment(departmentId);
                setDepartments(departments.filter(department => department.id === departmentId));
                toast.success("Xóa phòng ban thành công")
                const updatedDepartment = await fetchDepartments();
                setDepartments(updatedDepartment);
            } catch (error) {
                console.error("There was an error deleting the department!", error);
                alert("Có lỗi xảy ra khi xóa phòng ban.");
            }
        }

    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const pageCount = Math.ceil(departments.length / ITEMS_PER_PAGE);
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };
    const offset = currentPage * ITEMS_PER_PAGE;
    const paginatedDepartments = departments.slice(offset, offset + ITEMS_PER_PAGE);
    const filteredDepartments = paginatedDepartments.filter(department => department.departmentName.toLowerCase().startsWith(search.toLowerCase()));

    const header = ["ID", "Tên phòng ban", "Trạng thái", "Chức năng"];
    const row = filteredDepartments.map((department) => ({
        data: [String(department.id), department.departmentName, department.status],
        actions: [
            { className: 'btn-info', icon: 'fa-eye', onClick: handleModalInfo },
            { className: "btn-warning", icon: "fa-pen", onClick: handleUpdateDepartment },
            { className: 'btn-danger', icon: 'fa-trash', onClick: handleDeleteDepartment }
        ]
    }))

    return (
        <div>
            <section className="content-header">
                <div className="container-fluid" >
                    <div className="row mb-2" >
                        <div className="col-sm-6" >
                            <h1>Quản lý phòng ban</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><NavLink to="#">Home</NavLink></li>
                                <li className="breadcrumb-item active">Quản lý phòng ban</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row" >
                        {/* FROM INOUT */}
                        <DepartmentForm formValue={formValue} handleChange={handleChange} handleSubmit={handleSubmit} isEditing={isEditing} statuses={statuses} errors={errors} />
                        {/* LIST DEPARTMENT */}
                        <DepartmentTable header={header} row={row} pageCount={pageCount} handlePageClick={handlePageClick} search={search} handleSearch={handleSearch} />
                    </div>
                </div >
            </section >
            <InfoModal isOpen={isModalOpen} onClose={closeModal} title={modalContent.title} content={modalContent.content} />
        </div >
    )
}
