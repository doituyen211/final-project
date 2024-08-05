<<<<<<< HEAD
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalComponent from "../ModalComponent";
import DeleteComponent from "../DeleteItemComponent";

function TableComponents({
    cols,
    titleTable,
    dataTable,
    classTable,
    apiDelete,
    apiUpdate,
    apiView,
    formFieldsProp,
    getData,
}) {
    const [modalShow, setModalShow] = useState(false);
    const [modalProps, setModalProps] = useState({
        action: "",
        formFieldsProp: formFieldsProp,
        initialIsEdit: false,
        initialIdCurrent: null,
        apiUpdate: apiUpdate,
        apiView: apiView,
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    const handleSave = (formData) => {
        console.log("Saving data...");
        console.log("Form data:", formData);
        getData();
        // Your save logic here
    };

    const handleDeleteConfirmation = () => {
        getData();
    };

    const confirmDelete = (item) => {
        setDeleteItem(item);
        setShowConfirmModal(true);
    };
=======
import React from 'react';
import {Button} from 'react-bootstrap';

function TableComponents(props) {
    const {
        cols, titleTable, dataTable, classTable,
        formFieldsProp, actionView, actionEdit, useModal, actionDelete, openModal, currentPage
    } = props;

>>>>>>> crm_education

    return (
        <>
            <h2>{titleTable}</h2>
            <table className={classTable}>
                <thead>
                    <tr>
                        {Array.isArray(cols) &&
                            cols.map((col, index) => (
                                <th key={index} style={{ textAlign: "center" }}>
                                    {col}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                {dataTable.map((row, rowIndex) => (
                    <tr key={rowIndex}>
<<<<<<< HEAD
                        <td>{row.id}</td>
                        {formFieldsProp.map((field, cellIndex) => (
                            <td key={cellIndex} >{row[field.name]}</td>
=======
                        <td>{rowIndex + 10 * (currentPage - 1) + 1}</td>
                        {/*<td>{row.id}</td>*/}
                        {formFieldsProp.map((field, cellIndex) => (
                            <td key={cellIndex}>{row[field.name]}</td>
>>>>>>> crm_education
                        ))}
                        <td className="text-center">
                            <Button
                                variant="light"
                                className="me-2"
                                onClick={() => {
                                    if (!useModal) {
                                        console.log("Using actionView");
                                        actionView(row);
                                    } else {
                                        console.log("Using default view action");
                                        openModal('VIEW', true, row);
                                    }
                                }}
                            >
                                View
                            </Button>
                            <Button
                                variant="primary"
                                className="me-2"
                                onClick={() => {
                                    if (!useModal) {
                                        console.log("Using actionEdit");
                                        actionEdit(row);
                                    } else {
                                        console.log("Using default edit action");
                                        openModal('EDIT', true, row);
                                    }
                                }}
                            >
                                Edit
                            </Button>

                            <Button variant="danger" onClick={() => actionDelete(row)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
<<<<<<< HEAD
            <ModalComponent show={modalShow} getData={getData} {...modalProps} />
            <DeleteComponent
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onConfirm={handleDeleteConfirmation}
                deleteItem={deleteItem}
                apiDelete={apiDelete}
            />
=======

>>>>>>> crm_education
        </>
    );
}

export default TableComponents;
