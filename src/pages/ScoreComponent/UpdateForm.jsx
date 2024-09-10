import React, { useState, useEffect } from "react";
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
  // State for form inputs
  const [selectedTrainingProgram, setSelectedTrainingProgram] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedExamDate, setSelectedExamDate] = useState(null);
  const [grade, setGrade] = useState(dataRow.grade);

  useEffect(() => {
    // Initialize the form fields with current data row values
    setSelectedTrainingProgram({
      value: dataRow.programId,
      label: dataRow.programName,
    });
    setSelectedSubject({
      value: dataRow.subjectId,
      label: dataRow.subjectName,
    });
    setSelectedExamDate({ value: dataRow.examId, label: dataRow.examDate });
    setGrade(dataRow.grade);
  }, [dataRow]);

  // Generate options for Training Program, Subject, and Exam Date
  const trainingProgramOptions = trainingData.map((item) => ({
    value: item.program_id,
    label: item.program_name,
  }));

  const subjectOptions = subject.map((item) => ({
    value: item.subject_id,
    label: item.subject_name,
  }));

  const examDateOptions = data.map((item) => ({
    value: item.id,
    label: item.examDate,
  }));

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare updated data
    const updatedData = {
      // id: dataRow.id,
      // studentName: dataRow.studentName,
      programId: selectedTrainingProgram?.value,
      // programName: selectedTrainingProgram?.label,
      subjectId: selectedSubject?.value,
      // subjectName: selectedSubject?.label,
      examId: selectedExamDate?.value,
      // examDate: selectedExamDate?.label,
      grade: grade,
    };

    // Pass updated data to the parent component
    handleUpdate(updatedData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <span>Update</span>
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
            <label className="form-label">Name:</label>
            <input
              type="text"
              value={dataRow.studenName}
              disabled
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Training Program:</label>
            <Select
              options={trainingProgramOptions}
              value={selectedTrainingProgram}
              onChange={setSelectedTrainingProgram}
              placeholder="Select Training Program"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Subject:</label>
            <Select
              options={subjectOptions}
              value={selectedSubject}
              onChange={setSelectedSubject}
              placeholder="Select Subject"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Exam Date:</label>
            <Select
              options={examDateOptions}
              value={selectedExamDate}
              onChange={setSelectedExamDate}
              placeholder="Select Exam Date"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Grade:</label>
            <input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
