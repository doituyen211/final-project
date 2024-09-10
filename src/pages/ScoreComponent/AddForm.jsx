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
  formData,
  setFormData,
}) {
  // const [formData, setFormData] = React.useState({
  //   grade: "",
  //   studentId: null,
  //   trainingProgramId: null,
  //   subjectId: null,
  //   examScheduleId: null,
  // });

  const trainningProgramOptions = Array.from(
    new Set(trainingData.map((item) => item.program_id))
  ).map((id) => {
    const trainingProgram = trainingData.find((item) => item.program_id === id);
    return {
      value: id,
      label: trainingProgram.program_name,
    };
  });

  const subjectOption = Array.from(
    new Set(subject.map((item) => item.subject_id))
  ).map((id) => {
    const sub = subject.find((item) => item.subject_id === id);
    return {
      value: id,
      label: sub.subject_name,
    };
  });

  const studentOption = Array.from(new Set(student.map((item) => item.id))).map(
    (id) => {
      const studen = student.find((item) => item.id === id);
      return {
        value: id,
        label: studen.fullName,
      };
    }
  );

  const examDateOption = Array.from(new Set(data.map((item) => item.id))).map(
    (id) => {
      const examDate = data.find((item) => item.id === id);
      return {
        value: id,
        label: examDate.examDate,
      };
    }
  );

  const getSelectedOption = (options, value) => {
    return options.find((option) => option.value === value) || null;
  };

  const handleSelectChange = (selectedOption, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: selectedOption ? selectedOption.value : null,
    }));
  };

  const handleChangeGrade = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      grade: Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNew(formData);
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
              value={getSelectedOption(studentOption, formData.studentId)}
              onChange={(option) => handleSelectChange(option, "studentId")}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Training Program : </label>
            <Select
              value={getSelectedOption(
                trainningProgramOptions,
                formData.trainingProgramId
              )}
              onChange={(option) =>
                handleSelectChange(option, "trainingProgramId")
              }
              options={trainningProgramOptions}
              placeholder="Training Program"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Subject : </label>
            <Select
              value={getSelectedOption(subjectOption, formData.subjectId)}
              onChange={(option) => handleSelectChange(option, "subjectId")}
              options={subjectOption}
              placeholder="Subject"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Exam Date : </label>
            <Select
              placeholder="Exam Date"
              value={getSelectedOption(examDateOption, formData.examScheduleId)}
              onChange={(option) =>
                handleSelectChange(option, "examScheduleId")
              }
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
