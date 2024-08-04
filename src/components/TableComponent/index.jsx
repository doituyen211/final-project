import React, {useCallback, useState} from 'react';
import {Button} from 'react-bootstrap';
import ModalComponent from '../ModalComponent';
import DeleteComponent from '../DeleteItemComponent';

function TableComponents(props) {
    const {
        cols, titleTable, dataTable, classTable,
        api, formFieldsProp, getData, actionView, actionEdit, useModal
    } = props;

    const [modalShow, setModalShow] = useState(false);
    const [modalProps, setModalProps] = useState({
        action: '',
        formFieldsProp: formFieldsProp,
        initialIsEdit: false,
        initialIdCurrent: null,
        api
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    // Handle save data
    const handleSave = useCallback((formData) => {
        console.log("Saving data...");
        console.log("Form data:", formData);
        getData();
    }, [getData]);

    // Handle delete confirmation
    const handleDeleteConfirmation = useCallback(() => {
        getData();
    }, [getData]);

    // Open confirm delete modal
    const confirmDelete = useCallback((item) => {
        setDeleteItem(item);
        setShowConfirmModal(true);
    }, []);

    // Open modal with different settings
    const openModal = useCallback((action, isEdit, id) => {
        setModalProps({
            onHide: () => setModalShow(false),
            onSave: handleSave,
            action: action,
            formFieldsProp: formFieldsProp,
            initialIsEdit: isEdit,
            initialIdCurrent: id,
            api
        });
        setModalShow(true);
    }, [handleSave, formFieldsProp, api]);

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
                        <td>{rowIndex + 1}</td>
                        <td>{row.id}</td>
                        {formFieldsProp.map((field, cellIndex) => (
                            <td key={cellIndex}>{row[field.name]}</td>
                        ))}
                        <td className="text-center">
                            <Button
                                variant="light"
                                className="me-2"
                                onClick={() => {
                                    if (!useModal) {
                                        console.log("Using actionView");
                                        actionView(row.id);
                                    } else {
                                        console.log("Using default view action");
                                        openModal('VIEW', true, row.id);
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
                                        actionEdit(row.id);
                                    } else {
                                        console.log("Using default edit action");
                                        openModal('EDIT', true, row.id);
                                    }
                                }}
                            >
                                Edit
                            </Button>

                            <Button variant="danger" onClick={() => confirmDelete(row)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ModalComponent show={modalShow} getData={getData} {...modalProps} />
            <DeleteComponent
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                onConfirm={handleDeleteConfirmation}
                deleteItem={deleteItem}
                apiDelete={api}
            />
        </>
    );
}

export default TableComponents;
