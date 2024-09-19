import axios from "axios";
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
} from "react-bootstrap";

export default function ViewDetail({ show, handleClosed, detailId }) {
  const apiUrl = "http://localhost:9001/api/v1/scores";

  const [grades, setGrades] = React.useState([]);

  React.useEffect(() => {
    if (detailId) {
      fetchGradeByExamDate();
    }
  }, [detailId]);

  const fetchGradeByExamDate = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get-all-grade-by-exam-date`);
      // const data = await response.json();
      setGrades(response.data.data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClosed}>
      <ModalHeader closeButton>
        <span>Detail Information</span>
      </ModalHeader>
      <ModalBody>
        {grades.length === 0 ? (
          <p>No grade details available</p>
        ) : (
          grades.map((gradeData, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h5>Status: {gradeData.Status}</h5>
              <p>Average Grade: {gradeData["Average Grade"]}</p>
              <p>First Score: {gradeData["First Score"]}</p>
              <p>Second Score: {gradeData["Second Score"]}</p>
              <p>Third Score: {gradeData["Third Score"]}</p>

              <Table hover bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Subject</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th>Exam Date</th>
                    <th>Program</th>
                    <th>Course</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeData.grade.map((grade, idx) => (
                    <tr key={grade.id}>
                      <td>{idx + 1}</td>
                      <td>{grade.studentName}</td>
                      <td>{grade.subjectName}</td>
                      <td>{grade.grade}</td>
                      <td>{grade.status}</td>
                      <td>{grade.examDate}</td>
                      <td>{grade.programName}</td>
                      <td>{grade.courseName}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))
        )}
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleClosed}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}
