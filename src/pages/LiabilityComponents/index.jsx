import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {add_Liability, fetch_ListLiability, get_LiabilityById} from "./service/LiabilityService.";
import TableComponents from "../../components/TableComponents";
import TableBodyComponents from "../../components/TableBodyComponents";
import InfoModal from "./ModalLiability/ModalLiability";
import './sass/main.scss'
import ModalInfoLiability from "./Utilities/ModalInfoLiability";
import ButtonComponents from "../../components/ButtonComponents";
import ModalCreateUpdate from "./Utilities/ModalCreateUpdate";

const LiabilityComponents = () => {
    const [liability, setLiability] = useState([]);
    const [formValue, setFormValue] = useState({
        student_Id: "",
        student_name: "",
        address: "",
        email: "",
        phone_Number: "",
        debt: "",
        period_debt: "",
        status: "",
        course_id: [],
        personnel_id: "",
        note: "",
        create_date: "",
        update_date: "",
    });


    const [modalContent, setModalContent] = useState({title: "", content: ""});
    const [isModalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch_ListLiability();
            setLiability(data);
            console.log(data)
        }
        fetchData();
    }, []);

    const handle_Change = (e) => {
        const {name, value} = e.target;
        setFormValue({
            ...formValue, [name]: value
        })
    };
    const handle_ModalInfo = async (item) => {
        const liabilityId = item.data[0];
        const liability = await get_LiabilityById(liabilityId);
        if (liability) {
            setModalContent({
                title: "Thông tin công nợ cá nhân",
                content: <ModalInfoLiability liability={liability}/>
            });
            setModalOpen(true);
        }
    };
    const handle_ModalAdd = () => {
        setModalContent({
            title: "Thêm mới công nợ",
            content: <ModalCreateUpdate isNew={true} onSave={handle_addNew_Liability}/>
        })
        setModalOpen(true);
    };
    const handle_addNew_Liability = async (newLiability) => {
        try {
            await add_Liability(newLiability);
        } catch (e) {
            console.log("error", e)
        }
    };
    // const courseIdArray = Array.isArray(item.course_id) ? item.course_id : [item.course_id];
    // const courseIdString = courseIdArray.join(',');
    const header = ["ID", "Mã học viên", "Tên học viên", "Số Tiền Nợ", "Trạng Thái Nợ", "Khóa Học", "Ngày tạo", "Ngày cập nhật", "Chứ năng"]
    const rows = liability.map((item) => ({
        data: [item.id.toString(), item.student_Id.toString(), item.student_name, item.debt.toString(), item.status, Array.isArray(item.course_id) ? item.course_id.join(',') : item.course_id, item.create_date, item.update_date],
        actions: [
            {className: 'btn-info', icon: 'fa-eye', onClick: handle_ModalInfo},
            {className: "btn-warning", icon: "fa-pen", onClick: handle_Change},
            {className: 'btn-danger', icon: 'fa-trash', onClick: handle_Change}
        ]
    }));
    return (<div>
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Quản lý công nợ</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                            <li className="breadcrumb-item active">Quản lý công nợ</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h2 className="text-center">Danh sách công nợ</h2>
                            <div className="card-body">
                                <ButtonComponents type="button" className="btn-primary"
                                                  onClick={handle_ModalAdd}>Thêm mới</ButtonComponents>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <TableComponents headers={header}>
                                            <TableBodyComponents rows={rows}/>
                                        </TableComponents>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <InfoModal onClose={closeModal} isOpen={isModalOpen} title={modalContent.title} content={modalContent.content}/>
    </div>);
};

export default LiabilityComponents;
