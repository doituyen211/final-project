import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import FormComponent from "../FormComponent";
<<<<<<< HEAD
import axios from "axios";
import {toast} from "react-toastify";
=======
>>>>>>> crm_education

function ModalComponent(props) {
    const {
        onHide,
        show,
        action: initialAction,
        formFieldsProp,
        initialIdCurrent,
        api,
        getData
    } = props;

    const [actionModal, setActionModal] = useState(initialAction);

    useEffect(() => {
        if (['CREATE', 'EDIT', 'VIEW'].includes(initialAction)) {
            setActionModal(initialAction);
        } else {
            console.warn(`Invalid action: ${initialAction}`);
            setActionModal('CREATE'); // Default action
        }
<<<<<<< HEAD
    };
    const UpdateItem = (formData) => {
        axios.put(`${apiUpdate}/${formData.id}`, formData)
            .then(response => {
                console.log('Update successful:', response);
                onHide();
                getData()
                toast.success("Success Notification !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch(error => {
                console.error('There was an error updating the item:', error);
            });
    };

    const CreateItem = (formData) => {
        axios.post(apiCreate, formData)
            .then(response => {
                console.log('Create successful:', response);
                onHide();
                getData()
                toast.success("Success Notification !", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch(error => {
                console.error('There was an error creating the item:', error);
            });
    };
=======
    }, [initialAction]);

    // const handleEdit = () => {
    //     setActionModal('EDIT');
    // };
>>>>>>> crm_education

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {actionModal === 'EDIT' ? "Edit" : actionModal === 'VIEW' ? "View" : "Create"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormComponent
                    fields={formFieldsProp}
                    getData={getData}
                    action={actionModal}
                    idCurrent={initialIdCurrent}
                    onClose={onHide}
                    api={api}
                />
            </Modal.Body>
            <Modal.Footer>
                {/* Add footer content if needed */}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;
