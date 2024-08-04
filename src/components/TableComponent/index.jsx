import React, {useCallback, useState} from 'react';
import {Button} from "react-bootstrap";
import ModalComponent from "../ModalComponent";
import DeleteComponent from "../DeleteItemComponent";

function TableComponents(props) {
    const {
        cols, titleTable, dataTable, classTable,
        apiDelete, apiUpdate, apiView, formFieldsProp, getData
    } = props;

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

    // Hàm xử lý khi lưu dữ liệu
    const handleSave = useCallback((formData) => {
        console.log("Saving data...");
        console.log("Form data:", formData);
        getData();
    }, [getData]);

    // Hàm xử lý khi xác nhận xóa dữ liệu
    const handleDeleteConfirmation = useCallback(() => {
        getData();
    }, [getData]);

    // Hàm mở modal xác nhận xóa
    const confirmDelete = useCallback((item) => {
        setDeleteItem(item);
        setShowConfirmModal(true);
    }, []);

    // Hàm mở modal với các thiết lập khác nhau
    const openModal = useCallback((action, isEdit, id) => {
        setModalProps({
            onHide: () => setModalShow(false),
            onSave: handleSave,
            action: action,
            formFieldsProp: formFieldsProp,
            initialIsEdit: isEdit,
            initialIdCurrent: id,
            apiUpdate: apiUpdate,
            apiView: apiView
        });
        setModalShow(true);
    }, [handleSave, formFieldsProp, apiUpdate, apiView]);

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
                        <td>{row.id}</td>
                        {formFieldsProp.map((field, cellIndex) => (
                            <td key={cellIndex}>{row[field.name]}</td>
                        ))}
                        <td className="text-center">
                            <Button variant="light" className="me-2" onClick={() => openModal('VIEW', true, row.id)}>
                                View
                            </Button>
                            <Button variant="primary" className="me-2" onClick={() => openModal('EDIT', true, row.id)}>
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
                apiDelete={apiDelete}
            />
        </>
    );
}

export default TableComponents;
