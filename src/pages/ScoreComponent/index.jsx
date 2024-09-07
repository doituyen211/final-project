import React from "react";
import {
  Table,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
} from "react-bootstrap";
import DropSearch from "./DropSearch";
import axios from "axios";
import { BsPencil, BsTrash, BsPlus } from "react-icons/bs";

export default function ScoreComponent() {
  const [gradeData, setGradeData] = React.useState([]);
  const [dataRow, setDataRow] = React.useState({});

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [show, setShow] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);
  const [updateSelectId, setUpdateSelectId] = React.useState(null);

  // const apiUrl = "http://localhost:9001/score";
  const apiMock = "https://66b2e33c7fba54a5b7eab653.mockapi.io/grades/grade";

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(apiMock);
      setGradeData(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleShowUpdateForm = (data) => {
    setShow(true);
    setUpdateSelectId(data.id);
    setDataRow(data);
  };

  const handleShowAddForm = (data) => {
    setShowAdd(true);
    setDataRow(data);
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
          <button
            className="m-2 d-flex justify-content-center"
            onClick={() => handleShowAddForm(gradeData)}
          >
            <BsPlus className="text-success"></BsPlus>
          </button>
          <div className="row">
            <div className="col-3">
              <DropSearch data={gradeData} />
            </div>
            <div className="col-9">
              <TableSearchResult
                data={gradeData}
                showUpdateForm={handleShowUpdateForm}
              />
            </div>
            {show && updateSelectId && (
              <UpdateForm
                scoreData={gradeData}
                show={show}
                dataRow={dataRow}
                handleClose={() => setShow(false)}
              />
            )}

            {showAdd && (
              <AddForm
                scoreData={gradeData}
                show={showAdd}
                dataRow={dataRow}
                handleClose={() => setShowAdd(false)}
              />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function TableSearchResult({ data, showUpdateForm }) {
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
                      <button onClick={() => showUpdateForm(grade)}>
                        <BsPencil className="text-primary"></BsPencil>
                      </button>
                      <button>
                        <BsTrash className="text-danger"></BsTrash>
                      </button>
                    </td>
                  </tr>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

function UpdateForm({ show, handleClose, dataRow }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <span>Update</span>
      </ModalHeader>
      <ModalBody>
        <form>
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
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Subject : </label>
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Exam Date : </label>
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Score : </label>
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Status : </label>
            <input type="text"></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}

function AddForm({ show, handleClose, dataRow }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <span>Add</span>
      </ModalHeader>
      <ModalBody>
        <form>
          <div className="mb-3">
            <label className="form-label">Id : </label>
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Name : </label>
            <input type="text"></input>
          </div>
          {/* <div className="mb-3">
            <label className="form-label">Trainning Program : </label>
            <input type="number"></input>
          </div> */}
          {/* <div className="mb-3">
            <label className="form-label">Subject : </label>
            <input type="number"></input>
          </div> */}
          <div className="mb-3">
            <label className="form-label">Exam Date : </label>
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Score : </label>
            <input type="number"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Status : </label>
            <input type="text"></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}
