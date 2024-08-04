import React, {useCallback, useEffect, useMemo, useState} from 'react';
import TableComponents from '../../components/TableComponent';
import SelectDropdown from "../../components/SelectDownButton";
import PagingComponent from "../../components/PagingComponent";
import ModalComponent from "../../components/ModalComponent";
import {Button} from "react-bootstrap";
import axios from "axios";

const SubjectComponent = () => {
    const [state, setState] = useState({
        dataTable: [],
        titleTable: 'SubjectComponent',
        classTable: 'table table-bordered table-hover',
        totalPage: 5,
        currentPage: 1,
        isEdit: true,
        isCurrent: null,
        modalShow: false,
        modalProps: {
            show: false,
            action: '',
            formFieldsProp: [
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
            ],
            initialIsEdit: false,
            initialIdCurrent: null,
            apiUpdate: 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject',
            apiCreate: 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject'
        }
    });

    const apiEndpoints = {
        update: 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject',
        create: 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject',
        delete: 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject',
        view: 'https://66aa0b5b613eced4eba7559a.mockapi.io/subject'
    };

    const cols = ['Mã môn học', 'Tên môn học', 'Thời lượng', 'Tên chương trình học', 'Trạng thái', ''];

    const getData = useCallback(async () => {
        try {
            const res = await axios.get(apiEndpoints.view); // Get data from api
            setState(prevState => ({
                ...prevState,
                dataTable: res.data,
                currentPage: 1
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [apiEndpoints.view]);

    useEffect(() => {
        getData();
        console.log('Render SubjectComponent');
    }, [getData]);

    const handlePageChange = useCallback((pageNumber) => {
        setState(prevState => ({
            ...prevState,
            currentPage: pageNumber
        }));
    }, []);

    const handleSave = useCallback((formData) => {
        console.log("Saving data...");
        console.log("Form data:", formData);
        // Your save logic here
    }, []);

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

    const modalProps = useMemo(() => state.modalProps, [state.modalProps]);

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
                                            <Button variant="primary" size="lg" onClick={handleModalShow}>
                                                <i className="bi bi-plus-circle"></i>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <TableComponents cols={cols} dataTable={state.dataTable}
                                                             classTable={state.classTable}
                                                             apiDelete={apiEndpoints.delete}
                                                             apiUpdate={apiEndpoints.update}
                                                             apiView={apiEndpoints.view}
                                                             formFieldsProp={state.modalProps.formFieldsProp}
                                                             getData={getData}/>
                                        </div>
                                    </div>
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
                                <div className="card-footer">

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ModalComponent show={state.modalShow} getData={getData} {...modalProps} />
        </>
    );
}

export default SubjectComponent;
