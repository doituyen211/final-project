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
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
import axios from "axios";
import { BsPencil, BsTrash, BsPlus } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { CloseSquareFilled } from "@ant-design/icons";

export default function ScoreComponent() {
  const [gradeData, setGradeData] = React.useState([]);
  const [trainingData, setTrainningData] = React.useState([]);
  const [subject, setSubject] = React.useState([]);
  const [student, setStudent] = React.useState([]);

  // const [newGrade, setNewGrade] = React.useState([]);

  const [newGrade, setNewGrade] = React.useState({
    grade: "",
    studentId: null,
    trainingProgramId: null,
    subjectId: null,
    examScheduleId: null,
  });

  const [dataRow, setDataRow] = React.useState({});

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const [show, setShow] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [updateSelectId, setUpdateSelectId] = React.useState(null);
  const [deleteSelectedId, setDeleteSelectedID] = React.useState(null);
  const [addId, setAddId] = React.useState(null);

  const apiUrl = "http://localhost:9001/api/v1/scores";
  const apiTraining = "http://localhost:9001/training_program/getAllPrograms";
  const apiStudent = "http://localhost:9001/student";
  const apiSubject = "http://localhost:9001/api/v1/subjects/find-all";
  // const apiExamSche = ""
  // const apiMock = "https://66b2e33c7fba54a5b7eab653.mockapi.io/grades/grade";

  React.useEffect(() => {
    fetchData();
    fetchProgramData();
    fetchSubjectData();
    fetchStudentData();
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
  const fetchProgramData = async () => {
    try {
      const res = await axios.get(apiTraining);
      setTrainningData(res.data.data);
    } catch (err) {
      setError(err);
    }
  };
  const fetchStudentData = async () => {
    try {
      const res = await axios.get(apiStudent);
      setStudent(res.data);
    } catch (err) {
      setError(err);
    }
  };
  const fetchSubjectData = async () => {
    try {
      const res = await axios.get(apiSubject);
      setSubject(res.data.data);
    } catch (err) {
      setError(err);
    }
  };

  const handleShowUpdateForm = (data) => {
    setShow(true);
    setUpdateSelectId(data.id);
    setDataRow(data);
  };

  const handleUpdate = (updatedData) => {
    try {
      axios.put(`${apiUrl}/update-score/${updateSelectId}`, updatedData);
      setUpdateSelectId(null);
      setShow(false);
      toast.success("Record update successfully!");
    } catch (err) {
      toast.error(`Failed to update the record.${err}.Please try again.`);
    }
  };

  const handleShowAddForm = (data) => {
    setShowAdd(true);
    setAddId(data.id);
    setDataRow(data);
  };

  const handleAddNew = (value) => {
    setNewGrade(value);
    try {
      axios.post(`${apiUrl}/add-score`, newGrade);
      toast.success("Record added successfully!");
    } catch (err) {
      toast.error(`Failed to add new record.${err}.Please try again.`);
    }
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`${apiUrl}/delete-score/${id}`);
      setGradeData(gradeData.filter((data) => data.id !== id));
      setDeleteSelectedID(null);
      toast.success("Record deleted successfully!");
    } catch (err) {
      toast.error(`Failed to delete the record.${err}. Please try again.`);
    }
  };

  const handleSearch = (searchEntity) => {
    const filteredData = gradeData.filter((grade) => {
      const matchTrainningProgram = searchEntity.trainningProgram
        ? grade.programName === searchEntity.trainningProgram
        : true;
      const matchSubject = searchEntity.subject
        ? grade.subjectName === searchEntity.subject
        : true;
      const matchYear = searchEntity.year
        ? grade.courseName === searchEntity.year
        : true;
      const matchStatus = searchEntity.status
        ? grade.status === searchEntity.status
        : true;
      return matchTrainningProgram && matchSubject && matchYear && matchStatus;
    });
    setSearchResult(filteredData);
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
          <button className="m-2" onClick={() => handleShowAddForm(gradeData)}>
            <BsPlus className="text-success"></BsPlus>
          </button>
          <div className="row">
            <div className="col-3">
              <DropSearch data={gradeData} onSearch={handleSearch} />
            </div>
            <div className="col-9">
              <TableSearchResult
                data={gradeData}
                showUpdateForm={handleShowUpdateForm}
                result={searchResult}
                handleDelete={handleDelete}
              />
            </div>
            {show && updateSelectId && (
              <UpdateForm
                scoreData={gradeData}
                show={show}
                dataRow={dataRow}
                data={gradeData}
                handleClose={() => setShow(false)}
                handleUpdate={handleUpdate}
                trainingData={trainingData}
                subject={subject}
                student={student}
              />
            )}

            {showAdd && (
              <AddForm
                scoreData={gradeData}
                show={showAdd}
                data={gradeData}
                trainingData={trainingData}
                subject={subject}
                handleClose={() => setShowAdd(false)}
                handleAddNew={handleAddNew}
                student={student}
                formData={newGrade}
                setFormData={setNewGrade}
              />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function TableSearchResult({ data, showUpdateForm, result, handleDelete }) {
  const displayData = result.length > 0 ? result : data;

  return (
    <div className="container-fluid fullscreen">
      <Card>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>Id</th>
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
              {displayData.map((grade, i) => (
                <tr key={i}>
                  <td>{grade.id}</td>
                  <td>{grade.studenName}</td>
                  <td>{grade.programName}</td>
                  <td>{grade.subjectName}</td>
                  <td>{grade.courseName}</td>
                  <td>{grade.examDate}</td>
                  <td>{grade.grade}</td>
                  <td>sscore</td>
                  <td>tscore</td>
                  <td>aver</td>
                  <td>{grade.status}</td>
                  <td>
                    <button onClick={() => showUpdateForm(grade)}>
                      <BsPencil className="text-primary"></BsPencil>
                    </button>
                    <button onClick={() => handleDelete(grade.id)}>
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
