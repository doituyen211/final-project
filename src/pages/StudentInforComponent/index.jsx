import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import FormComponent from "./formStuInforcomponent";
import API from "../../store/Api";

// Hằng số định nghĩa trạng thái khởi tạo và các cột của bảng
const INITIAL_STATE = {
  dataTable: [], // Dữ liệu bảng
  titleTable: "StudentInfor", // Tiêu đề của bảng
  classTable: "table table-bordered table-hover", // Lớp CSS của bảng
  modalShow: false, // Trạng thái hiển thị modal
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
        name: "face",
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
    initialIsEdit: false,
    initialIdCurrent: null,
    api: API.INFOR_STU,
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

  // Handle the input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  // Handle form submission (e.g., validate and submit to API)
  const handleSubmit = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    // Perform further validation and submit to API
    console.log("Password change form submitted:", passwordForm);
    setShowPasswordModal(false); // Close the modal
  };

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
            {/* Card cho Form Component */}
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    style={{ marginBottom: "10px" }}
                  >
                    Thông tin chi tiết
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

            {/* Card cho các bộ lọc, ô tìm kiếm và nút thêm mới */}
            <div className="col-md-9">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row mb-4">
                    <FormComponent
                      title={"Thông tin"}
                      fields={state.modalProps.formFieldsProp}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for password change */}
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
