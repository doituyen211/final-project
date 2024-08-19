import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import FormComponent from "./formStuInforcomponent";
import {
  fetchStudents,
  updateStudent,
  changePassword,
} from "../../services/studentApi";

const INITIAL_STATE = {
  dataTable: [],
  titleTable: "StudentInfor",
  classTable: "table table-bordered table-hover",
  modalShow: false,
  modalProps: {
    show: false,
    action: "",
    formFieldsProp: [
      {
        name: "ma_hoc_vien",
        type: "text",
        label: "Mã học viên",
        placeholder: "",
        value: "", // Add current value if needed
        readOnly: true, // Set to true if you don't want to allow editing
      },
      {
        name: "email",
        type: "text",
        label: "Email",
        placeholder: "",
        value: "",
      },
      {
        name: "ho_ten",
        type: "text",
        label: "Họ tên",
        placeholder: "Nhập họ và tên",
        value: "",
      },
      {
        name: "so_dien_thoai",
        type: "text",
        label: "Số điện thoại",
        placeholder: "Nhập số điện thoại",
        value: "",
      },
      {
        name: "nguon",
        type: "text",
        label: "Nguồn",
        placeholder: "nguồn",
        value: "",
      },
      {
        name: "ngay_sinh",
        type: "date",
        label: "Ngày sinh",
        placeholder: "Chọn ngày sinh",
        value: "",
      },
      {
        name: "year",
        type: "text",
        label: "Năm thứ",
        placeholder: "Nhập năm thứ",
        value: "",
      },
      {
        name: "link_fb",
        type: "text",
        label: "Link facebook",
        placeholder: "Nhập link facebook",
        value: "",
      },
      {
        name: "dia_chi",
        type: "text",
        label: "Địa chỉ",
        placeholder: "Nhập tỉnh thành",
        value: "",
      },
      {
        name: "Id_ctdd",
        type: "text",
        label: "Id Chương trình đào tạo",
        value: "",
        readOnly: true, // Set to true if you don't want to allow editing
      },
    ],
  },
};

const StudenInforComponent = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Manage edit mode here

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const students = await fetchStudents();
        if (students.length > 0) {
          const student = students[0]; // Adjust as needed to select the right student
          setStudent(student);
          setState((prevState) => ({
            ...prevState,
            modalProps: {
              ...prevState.modalProps,
              formFieldsProp: prevState.modalProps.formFieldsProp.map(
                (field) => ({
                  ...field,
                  value: student[field.name] || "",
                })
              ),
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleFieldChange = (name, value) => {
    setState((prevState) => ({
      ...prevState,
      modalProps: {
        ...prevState.modalProps,
        formFieldsProp: prevState.modalProps.formFieldsProp.map((field) =>
          field.name === name ? { ...field, value } : field
        ),
      },
    }));
  };

  const handleUpdateStudent = async (updatedData) => {
    if (!student) return;

    try {
      await updateStudent(student.id, updatedData);
      alert("Thông tin học viên đã được cập nhật!");
    } catch (error) {
      console.error("Error updating student information:", error);
      alert("Đã xảy ra lỗi khi cập nhật thông tin học viên!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      await changePassword(
        student.id,
        passwordForm.currentPassword,
        passwordForm.newPassword
      );
      alert("Mật khẩu đã được thay đổi thành công!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Mật khẩu hiện tại không chính xác hoặc đã xảy ra lỗi!");
    }

    setShowPasswordModal(false);
  };

  useEffect(() => {
    if (showPasswordModal) {
      // Reset password form when modal opens
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [showPasswordModal]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Thông tin học viên</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <button onClick={() => console.log("Home clicked")}>
                    Home
                  </button>
                </li>
                <li className="breadcrumb-item active">Thông tin học viên</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    style={{ marginBottom: "10px" }}
                    onClick={() => setIsEditing(true)} // Open edit mode
                  >
                    Cập nhật thông tin
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row mb-4">
                    <FormComponent
                      fields={state.modalProps.formFieldsProp}
                      onFormSubmit={handleUpdateStudent}
                      isEditing={isEditing}
                      onEditClick={setIsEditing} // Pass down handler
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Mật khẩu hiện tại</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                placeholder="Nhập mật khẩu hiện tại"
                value={passwordForm.currentPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                value={passwordForm.newPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Xác nhận mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu mới"
                value={passwordForm.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPasswordModal(false)}
          >
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudenInforComponent;
