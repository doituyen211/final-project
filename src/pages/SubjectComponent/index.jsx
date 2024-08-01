import React, {useEffect, useState} from 'react';
import TableComponents from '../../components/TableComponent';
import SelectDropdown from "../../components/SelectDownButton";
import PagingComponent from "../../components/PagingComponent";
import SubjectCreateComponent from "../SubjectCreateComponent";
import ModalComponent from "../../components/ModalComponent";
import {Button} from "react-bootstrap";
import axios from "axios";

const SubjectComponent = () => {
    const [dataTable, setDataTable] = useState([]);
    const [titleTable, setTitleTable] = useState('');
    const [classTable, setClassTable] = useState('');
    const [totalPage, setTotalPage] = useState(5);
    const [isEdit, setIsEdit] = useState(false);
    const [isCurrent, setIsCurrent] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const apiUpdate = 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject'
    const apiCreate = 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject'
    const formFieldsProp = [
        {
            name: 'name',
            type: 'text',
            label: 'Name',
            placeholder: 'Enter the name',
        },
        {
            name: 'duration',
            type: 'text',
            label: 'Duration',
            placeholder: 'Enter duration',
        },
        {
            name: 'programName',
            type: 'select',
            label: 'Program Name',
            placeholder: 'Select a program',
            apiUrl: '/data/status.json',
            defaultOption: {
                value: '',
                label: 'Select a program'
            }
        },
        {
            name: 'status',
            type: 'select',
            label: 'Status',
            placeholder: 'Select status',
            apiUrl: '/data/status.json',
            defaultOption: {
                value: '',
                label: 'Select status'
            }
        }
    ]
    const cols = ['Mã môn học', 'Tên môn học', 'Thời lượng', 'Tên chương trình học', 'Trạng thái', '']

    //BEGIN- GetData
    const getData = async () => {
        try {
            const res = await axios.get('/data/subject.json'); // Get data from api
            setDataTable(res.data.data);
            setTitleTable('SubjectComponent');
            setClassTable('table table-bordered table-hover');
            setTotalPage(5);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching data:", error);

        }
    };


    useEffect(() => {
        getData();
    }, []);
    //END - Get Data

    //Begin - Paging
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //End - Paging
    //Modal
    const [modalShow, setModalShow] = useState(false);


    //Begin - Create
    const handleSave = (formData) => {
        console.log("Saving data...");
        console.log("Form data:", formData);
        // Your save logic here
    };
    //End - Create

    // const handleSubmit = (formData) => {
    //     console.log('Form submitted with data:', formData);
    //     console.log('Form submitted with data:', formData);
    //     const apiUrl = isEdit ? `${apiUpdate}/${formData.id}` : apiCreate;
    //     const method = isEdit ? 'put' : 'post';
    //
    //     axios[method](apiUrl, formData)
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    //
    // };
    //Begin - Search
    const handleSearch = () => {
    }
    // End - Search
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
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Quản lý môn học</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="card card-primary">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-md-10 d-flex align-items-center gap-3">
                                            <div className="d-flex gap-3 col-md-6">
                                                <SelectDropdown
                                                    id="programStatus1"
                                                    defaultOption={{value: '', label: 'Chọn trạng thái'}}
                                                    apiUrl="/data/status.json"
                                                    className="form-select"
                                                />
                                                <SelectDropdown
                                                    id="programStatus2"
                                                    defaultOption={{value: '', label: 'Chọn chương trình học'}}
                                                    apiUrl="/data/status.json"
                                                    className="form-select"
                                                />
                                            </div>
                                            <div
                                                className="d-flex col-md-6 align-items-center justify-content-end gap-2">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                    aria-label="Search input"
                                                />
                                                <Button variant="light" size="sm">
                                                    <i className="bi bi-search"></i>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="col-md-2 d-flex align-items-center justify-content-end">
                                            <Button variant="primary" size="lg" onClick={() => setModalShow(true)}>
                                                <i className="bi bi-plus-circle"></i>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <TableComponents cols={cols} dataTable={dataTable} classTable={classTable}/>
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
                                <div className="card-footer">

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*
        díplay modal
        */}
            <ModalComponent
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSave={handleSave}
                action="EDIT"
            >
                <SubjectCreateComponent
                    formFieldsProp={formFieldsProp}
                    initialIsEdit={isEdit}
                    initialIdCurrent={isCurrent}
                />
            </ModalComponent>
        </>
    );
}

export default SubjectComponent;
