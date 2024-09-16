import React from "react";
import { Card, CardBody, CardHeader, Button } from "react-bootstrap";
import { Space, Table, Tag } from "antd";
import DropSearch from "./DropSearch";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
import axios from "axios";
import { BsPencil, BsTrash, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";

export default function ScoreComponent() {
  const [gradeData, setGradeData] = React.useState([]);
  const [trainingData, setTrainningData] = React.useState([]);
  const [subject, setSubject] = React.useState([]);
  const [student, setStudent] = React.useState([]);

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
  const [onSearch, setOnSearch] = React.useState(false);
  const [updateSelectId, setUpdateSelectId] = React.useState(null);
  const [deleteSelectedId, setDeleteSelectedID] = React.useState(null);

  const apiUrl = "http://localhost:9001/api/v1/scores";
  const apiTraining = "http://localhost:9001/training_program/getAllPrograms";
  const apiStudent = "http://localhost:9001/student";
  const apiSubject = "http://localhost:9001/api/v1/subjects/find-all";
  const apiExamschedule = "http://localhost:9001/api/v1/examschedules";

  React.useEffect(() => {
    fetchData();
    fetchProgramData();
    fetchSubjectData();
    fetchStudentData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(apiUrl);
      setGradeData(res.data.data);
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
      axios
        .put(`${apiUrl}/update-score/${updateSelectId}`, updatedData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          setUpdateSelectId(null);
          setShow(false);
          toast.success("Record updated successfully!");
        })
        .catch((err) => {
          console.error("Error details:", err.response?.data || err.message);
          toast.error(
            `Failed to update the record. ${err.message}. Please try again.`
          );
        });
    } catch (err) {
      toast.error(
        `Failed to update the record. ${err.message}. Please try again.`
      );
    }
  };

  const handleShowAddForm = (data) => {
    setShowAdd(true);
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

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
    {
      title: "Student Name",
      dataIndex: "studenName",
      key: "studenName",
    },
    {
      title: "Grade 1st",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Grade 2nd",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Grade 3th",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Passed" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subjectName",
    },
    {
      title: "Exam Date",
      dataIndex: "examDate",
      key: "examDate",
    },
    {
      title: "Program Name",
      dataIndex: "programName",
      key: "programName",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button variant="white" onClick={() => handleShowUpdateForm(record)}>
            <BsPencil className="text-primary"></BsPencil>
          </Button>
          <Button variant="white" onClick={() => handleDelete(record.id)}>
            <BsTrash className="text-danger"></BsTrash>
          </Button>
        </Space>
      ),
    },
  ];

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
          <Button variant="white" onClick={() => handleShowAddForm(gradeData)}>
            <BsPlus className="text-success"></BsPlus>
          </Button>
          <div className="row">
            <div className="col-2">
              <DropSearch data={gradeData} onSearch={handleSearch} />
            </div>
            <div className="col-10">
              <TableSearchResult
                data={gradeData}
                showUpdateForm={handleShowUpdateForm}
                result={searchResult}
                handleDelete={handleDelete}
                onSearch={onSearch}
                setOnSearch={setOnSearch}
                columns={columns}
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

function TableSearchResult({ data, result, onSearch, setOnSearch, columns }) {
  const sortData = data.sort((a, b) => a.id - b.id);
  const sortResult = result.sort((a, b) => a.id - b.id);
  let displayData = [];

  if (sortResult.length !== 0) {
    setOnSearch(true);
    if (onSearch && sortResult.length === 0) {
      displayData = [];
    } else if (onSearch && sortResult.length > 0) {
      displayData = sortResult;
    }
  }

  // const displayData = sortResult.length > 0 ? sortResult : sortData;

  return (
    <div className="container-fluid fullscreen">
      <Card>
        <CardBody>
          <Table
            columns={columns}
            dataSource={displayData}
            rowKey="id"
            bordered
          />
        </CardBody>
      </Card>
    </div>
  );
}
