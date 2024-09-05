import React from "react";
import { Table, Card, CardBody, CardHeader } from "react-bootstrap";
import DropSearch from "./DropSearch";
import axios from "axios";
import { BsPencil, BsTrash, BsPlus } from "react-icons/bs";

export default function ScoreComponent() {
  const [gradeData, setGradeData] = React.useState([]);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const apiUrl = "http://localhost:9001/score";

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(apiUrl);
      setGradeData(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div class="spinner-grow text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p>Error occurred: {error.message}</p>;

  return (
    <Card>
      <CardHeader>
        <h3>Quản lí điểm</h3>
      </CardHeader>
      <CardBody className="d-flex justify-content-center">
        <div className="container-fluid fullscreen">
          <button className="m-2 d-flex justify-content-center">
            <BsPlus className="text-success"></BsPlus>
          </button>
          <div className="row ">
            <div className="col-3">
              <DropSearch data={gradeData} />
            </div>
            <div className="col-9">
              <TableSearchResult data={gradeData} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function TableSearchResult({ data }) {
  return (
    <div className="container-fluid fullscreen">
      <Card>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tranning Program</th>
                <th>Subject</th>
                <th>Year</th>
                <th>Exam Date</th>
                <th>First Score</th>
                <th>Second Score</th>
                <th>Third Score</th>
                <th>Average Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((grade, i) => (
                <tr key={grade.id}>
                  <td>{grade.studenName}</td>
                  <td>{grade.programName}</td>
                  <td>{grade.subjectName}</td>
                  <td>{grade.courseName}</td>
                  <td>{grade.examDate}</td>
                  <td>fscore</td>
                  <td>sscore</td>
                  <td>tscore</td>
                  <td>aver</td>
                  <td>{grade.status}</td>
                  <td>
                    <button>
                      <BsPencil className="text-primary"></BsPencil>
                    </button>
                    <button>
                      <BsTrash className="text-danger"></BsTrash>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
