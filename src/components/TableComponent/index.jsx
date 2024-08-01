import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import ModalComponent from "../ModalComponent";
import DeleteComponent from "../DeleteItemComponent";

function TableComponents({
                             cols, titleTable, dataTable, classTable,
                             apiDelete, apiUpdate, apiView, formFieldsProp
                         }) {
    const [modalShow, setModalShow] = useState(false);
    const [modalProps, setModalProps] = useState({
        action: '',
        formFieldsProp: formFieldsProp,
        initialIsEdit: false,
        initialIdCurrent: null,
        apiUpdate: apiUpdate,
        apiView: apiView
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    const handleSave = (formData) => {
        console.log("Saving data...");
        console.log("Form data:", formData);
        // Your save logic here
    };

    const handleDeleteConfirmation = () => {

    };

    const confirmDelete = (item) => {
        setDeleteItem(item);
        setShowConfirmModal(true);
    };

    return (
        <>
            <h2>{titleTable}</h2>
            <table className={classTable}>
                <thead>
                <tr>
                    {Array.isArray(cols) && cols.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {dataTable.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                        <td className="text-center">
                            <Button variant="light" className="me-2" onClick={() => {
                                setModalProps({
                                    onHide: () => setModalShow(false),
                                    onSave: handleSave,
                                    action: 'VIEW',
                                    formFieldsProp: formFieldsProp,
                                    initialIsEdit: true,
                                    initialIdCurrent: row.id,
                                    apiUpdate: apiUpdate,
                                    apiView: apiView
                                });
                                setModalShow(true);
                            }}>
                                View
                            </Button>
                            <Button variant="primary" className="me-2" onClick={() => {
                                setModalProps({
                                    onHide: () => setModalShow(false),
                                    onSave: handleSave,
                                    action: 'EDIT',
                                    formFieldsProp: formFieldsProp,
                                    initialIsEdit: true,
                                    initialIdCurrent: row.id,
                                    apiUpdate: apiUpdate,
                                    apiView: apiView
                                });
                                setModalShow(true);
                            }}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => confirmDelete(row)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ModalComponent show={modalShow} {...modalProps} />
            <DeleteComponent
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onConfirm={handleDeleteConfirmation}
                deleteItem={deleteItem}
                apiDelete={apiDelete}
            />
        </>
    );
}

export default TableComponents;
