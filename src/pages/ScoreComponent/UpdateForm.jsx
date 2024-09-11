import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Modal, ModalHeader, ModalBody } from "react-bootstrap";

export default function UpdateForm({
  show,
  handleClose,
  dataRow,
  handleUpdate,
  trainingData,
  subject,
  student,
  data,
}) {
  const [valueChange, setValueChange] = React.useState(null);

  // Initialize the state with default values
  const [updateData, setUpdateData] = useState({
    grade: "",
    studentId: "",
    trainingProgramId: "",
    subjectId: "",
    examScheduleId: "",
  });

  // Generate options for selects
  const trainningProgramOptions = Array.from(
    new Set(trainingData.map((item) => item.program_id))
  ).map((id) => {
    const trainingProgram = trainingData.find((item) => item.program_id === id);
    return {
      value: id,
      label: trainingProgram.program_name,
    };
  });

  const subjectOptions = Array.from(
    new Set(subject.map((item) => item.subject_id))
  ).map((id) => {
    const sub = subject.find((item) => item.subject_id === id);
    return {
      value: id,
      label: sub.subject_name,
    };
  });

  const examDateOptions = Array.from(new Set(data.map((item) => item.id))).map(
    (id) => {
      const examDate = data.find((item) => item.id === id);
      return {
        value: id,
        label: examDate.examDate,
      };
    }
  );

  const studentOptions = Array.from(
    new Set(student.map((item) => item.id))
  ).map((id) => {
    const stu = student.find((item) => item.id === id);
    return {
      value: id,
      label: stu.fullName,
    };
  });

  const findIdByName = (name, options) => {
    const option = options.find((opt) => opt.label === name);
    return option ? option.value : "";
  };

  const firstUpdate = React.useRef(true);
  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      if (dataRow) {
        setUpdateData({
          grade: dataRow.grade || "",
          studentId: findIdByName(dataRow.studenName, studentOptions) || "",
          trainingProgramId:
            findIdByName(dataRow.programName, trainningProgramOptions) || "",
          subjectId: findIdByName(dataRow.subjectName, subjectOptions) || "",
          examScheduleId: findIdByName(dataRow.examDate, examDateOptions) || "",
        });
      }
    }
  }, [
    dataRow,
    subjectOptions,
    trainningProgramOptions,
    examDateOptions,
    studentOptions,
  ]);

  const handleChange = (name) => (selectedOption) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleChangeGrade = (e) => {
    const { value } = e.target;
    const numberValue = Number(value);
    setUpdateData((prevData) => ({
      ...prevData,
      grade: numberValue,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updateData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <span>Update Grade</span>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="form-label">Id:</label>
            <input
              type="number"
              value={dataRow.id}
              disabled
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Student:</label>
            <Select
              value={studentOptions.find(
                (option) => option.value === updateData.studentId
              )}
              options={studentOptions}
              isDisabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Training Program:</label>
            <Select
              value={trainningProgramOptions.find(
                (option) => option.value === updateData.trainingProgramId
              )}
              onChange={handleChange("trainingProgramId")}
              options={trainningProgramOptions}
              placeholder="Select Training Program"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Subject:</label>
            <Select
              value={subjectOptions.find(
                (option) => option.value === updateData.subjectId
              )}
              onChange={handleChange("subjectId")}
              options={subjectOptions}
              placeholder="Select Subject"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Exam Date:</label>
            <Select
              value={examDateOptions.find(
                (option) => option.value === updateData.examScheduleId
              )}
              onChange={handleChange("examScheduleId")}
              options={examDateOptions}
              placeholder="Select Exam Date"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Grade:</label>
            <input
              type="number"
              value={updateData.grade}
              onChange={handleChangeGrade}
              placeholder="Enter Grade"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
