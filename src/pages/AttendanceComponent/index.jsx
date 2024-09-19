import React, {useEffect, useState} from "react";
import PagingComponent from "../../components/PagingComponent";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropDownComponent from "../../components/DropDownComponent";
import FormInput from "../../components/FormInputComponents";
import DateInputComponent from "../../components/DateInputComponents";

const AnttendaceComponent = () => {
    const [totalPage, setTotalPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản Lý Điểm Danh</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Quản lý điểm danh</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid full-screen">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mt-1">
                                        <div><DropDownComponent title={"Danh sách lớp học"}/></div>
                                        <div style={{marginLeft: 8}}><DropDownComponent title={"Danh sách môn học"}/>
                                        </div>
                                        <div style={{marginLeft: 8}}>
                                            <DateInputComponent/>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center mt-3">
                                        <div className="col-auto">
                                            <PagingComponent
                                                totalPage={totalPage}
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

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default AnttendaceComponent;
