import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FormComponent from "./FormComponent";
import axios from "axios";
import { toast } from "react-toastify";

function ModalComponent({
  onHide,
  show,
  action,
  formFieldsProp,
  initialIdCurrent,
  apiUpdate,
  apiCreate,
  apiView, // Ensure apiView is passed
  getData,
  studentId, // Receive studentId prop
}) {
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({}); // Initialize with an empty object
  const [loadingData, setLoadingData] = useState(false); // Handle loading state


  // Fetch reservation data for editing or viewing when modal opens
  useEffect(() => {
    const fetchReservationData = async () => {
      if ((action === "EDIT" || action === "VIEW") && initialIdCurrent) {
        setLoadingData(true); // Set loading state to true while fetching
        try {
          const response = await axios.get(`${apiView}/${initialIdCurrent}`);
          setFormData(response.data); // Load reservation data into state
        } catch (error) {
          console.error("Error fetching reservation data:", error);
        } finally {
          setLoadingData(false); // Set loading to false once done
        }
      } else if (action === "CREATE") {
        setFormData({}); // Reset formData for new entries
      }
    };
    fetchReservationData();
  }, [action, initialIdCurrent, apiView]);

  // Handle saving the form data (CREATE or EDIT)
  const handleSave = async (submittedFormData) => {
    try {
      if (action === "EDIT") {
        await axios.put(`${apiUpdate}/${initialIdCurrent}`, submittedFormData);
        toast.success("Update Successful!", { position: toast.POSITION.TOP_RIGHT });
      } else if (action === "CREATE") {
        await axios.post(apiCreate, submittedFormData);
        toast.success("Item Created Successfully!", { position: toast.POSITION.TOP_RIGHT });
      }
      onHide();
      getData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

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
          {action === "EDIT"
            ? "Cập nhật"
            : action === "VIEW"
            ? "Xem chi tiết"
            : "Thêm mới"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display student details only when action is not "CREATE" */}
        {studentData && action !== "CREATE" ? (
          <div>
            <h5>Student Details</h5>
            <p>
              <strong>Name:</strong> {studentData.student_name}
            </p>
            <p>
              <strong>Email:</strong> {studentData.email}
            </p>
            <p>
              <strong>Call Number:</strong> {studentData.call_number}
            </p>
            <p>
              <strong>Status:</strong> {studentData.status}
            </p>
          </div>
        ) : null}

        {/* Form for reservation or other data */}
        {loadingData ? (
          <p>Loading reservation data...</p> // Show loading while fetching
        ) : action === "CREATE" || Object.keys(formData).length > 0 ? (
          <FormComponent
            fields={formFieldsProp}
            onSubmit={handleSave}
            formData={formData} // Pass formData to FormComponent
            isEdit={action === "EDIT"}
            isView={action === "VIEW"}
            onClose={onHide}
          />
        ) : (
          <p>No data to display.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
