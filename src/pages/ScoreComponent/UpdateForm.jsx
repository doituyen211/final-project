import React from "react";
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
  // setSelectedOption(options.find(option => option.value === 'chocolate'));
  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <span>Update</span>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Id : </label>
            <input type="number" value={dataRow.id} disabled></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Name : </label>
            <input type="text" value={dataRow.studenName} disabled></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Trainning Program : </label>
            <Select
              options={trainningProgramOptions}
              value={dataRow.programName}
              placeholder="Training Program"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Subject : </label>
            <Select
              options={subjectOption}
              value={dataRow.subjectName}
              placeholder="Subject"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Exam Date : </label>
            <Select
              options={examDateOption}
              value={dataRow.examDate}
              placeholder="Exam Date"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Grade : </label>
            <input type="number" defaultValue={dataRow.grade}></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
