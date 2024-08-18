import { Button, Modal } from 'bootstrap';
import { useEffect, useState } from 'react';

const QualificationEditComponent = ({ show, handleClose, contract, onSave }) => {

  const [formData, setFormData] = useState({
    employeeId: '',
    contractType: '',
    salary: '',
    startDate: '',
    endDate: '',
    status: true,
    files: []
  });

  useEffect(() => {
    if (contract) {
      setFormData({
        employeeId: contract.employeeId || '',
        contractType: contract.contractType || '',
        salary: contract.salary || '',
        startDate: contract.startDate || '',
        endDate: contract.endDate || '',
        status: contract.status || false,
        files: contract.files || []
      });
    }
  }, [contract]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: Array.from(files)
      });
    } else if (name === "status") {
      setFormData({
        ...formData,
        [name]: value === "true" // Convert string to boolean
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa bằng cấp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Tên bằng cấp</label>
            <input
              type="text"
              className="form-control"
              name="qualificationName"
              value={formData.qualificationName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Tên nhân viên</label>
            <input
              type="text"
              className="form-control"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Chức vụ</label>
            <input
              type="text"
              className="form-control"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Thời hạn</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default QualificationEditComponent;
