import axios from "axios";
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "react-bootstrap";

export default function ViewDetail({ show, dandleClosed, detailId }) {
  const apiUrl = "http://localhost:9001/api/v1/scores";

  const [grades, setGrades] = React.useState([]);
  const [result, setResult] = React.useState({});

  React.useEffect(() => {
    if (detailId) {
      fetchGradeByExamDate();
    }
  }, [detailId]);

  const fetchGradeByExamDate = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get-all-grade-by-exam-date`);
      const data = await response.json();
      setGrades(data.data.grade);
      setResult(data.data.result);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  return (
    <Modal show={show} onHide={dandleClosed}>
      <ModalHeader closeButton>
        <span>Detail Information</span>
      </ModalHeader>
      <ModalBody>
        <div>
          <h1>Grades</h1>
          <ul>
            {grades.length > 0 ? (
              grades.map((grade) => (
                <li key={grade.id}>
                  {grade.subjectName}: {grade.grade} ({grade.status})
                </li>
              ))
            ) : (
              <p>No grades available</p>
            )}
          </ul>
          <h2>Result</h2>
          <p>Status: {result.Status}</p>
          <p>Average Grade: {result["Average Grade"]}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={dandleClosed}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}
