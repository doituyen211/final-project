import React from "react";
import Select from "react-select";
import { Modal, ModalHeader, ModalBody } from "react-bootstrap";

export default function AddForm({
  show,
  handleClose,
  data,
  handleAddNew,
  trainingData,
  subject,
  student,
}) {
  const [formData, setFormData] = React.useState({
    grade: "",
    studentId: null,
    trainingProgramId: null,
    subjectId: null,
    examScheduleId: null,
  });

  const trainningProgramOptions = Array.from(
    new Set(trainingData.map((item) => item.programId))
  ).map((id) => {
    const trainingProgram = trainingData.find((item) => item.id === id);
    return {
      value: id,
      label: trainingProgram.programName,
    };
  });

  const subjectOption = Array.from(
    new Set(subject.map((item) => item.subjectId))
  ).map((id) => {
    const sub = subject.find((item) => item.id === id);
    return {
      value: id,
      label: sub.subjectName,
    };
  });

  const studentOption = Array.from(
    new Set(student.map((item) => item.studentId))
  ).map((id) => {
    const stu = student.find((item) => item.id === id);
    return {
      value: id,
      label: stu.studenName,
    };
  });

  const examDateOption = Array.from(
    new Set(data.map((item) => item.examDate))
  ).map((id) => {
    const student = data.find((item) => item.id === id);
    return {
      value: id,
      label: student.studenName,
    };
  });

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: selectedOption,
    }));
  };

  const handleChangeGrade = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      grade: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNew({ formData });
    setFormData({
      grade: "",
      studentId: null,
      trainingProgramId: null,
      subjectId: null,
      examScheduleId: null,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <span>Add Grade</span>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name : </label>
            <Select
              options={studentOption}
              placeholder="Student"
              value={formData.studentId}
              onChange={(option) => handleSelectChange(option, "studentId")}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Trainning Program : </label>
            <Select
              value={formData.trainingProgram}
              onChange={(option) =>
                handleSelectChange(option, "trainingProgram")
              }
              options={trainningProgramOptions}
              placeholder="Trainning Program"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Subject : </label>
            <Select
              value={formData.subjectId}
              onChange={(option) => handleSelectChange(option, "subjectId")}
              options={subjectOption}
              placeholder="Subject"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Exam Date : </label>
            <Select
              placeholder="Exam Date"
              value={formData.examDateId}
              onChange={(option) => handleSelectChange(option, "examDateId")}
              options={examDateOption}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Score : </label>
            <input
              type="number"
              value={formData.grade}
              onChange={handleChangeGrade}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
