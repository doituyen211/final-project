import axios from "axios";
import { Button, Table, Modal, Form, FormGroup } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function ScoreComponent() {
  const [data, setData] = useState([]);

  const [dataRow, setDataRow] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [updateDataId, setUpdateDataId] = useState(null);

  const [newData, setNewData] = useState({
    name: "",
    grade: [],
    status: "",
    examDate: null,
    subject: [],
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const handleNewData = (e) => {
  //   setNewData({ ...newData});
  // };

  const Url = "https://66b2e33c7fba54a5b7eab653.mockapi.io/grades/grade";
  /* param: id, name , grade, examDate, subject*/

  const url = "https://freetestapi.com/api/v1/students ";
  // param: id, name, age, gender, address, email, phone, courses, gpa, image

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(Url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error.message}</p>;

  const handleViewData = (id) => {
    setSelectedId(id);
  };
  const handleShowUpdateForm = (data) => {
    setShow(true);
    setUpdateDataId(data.id);
    setDataRow(data);
  };

  function handleAdd() {}

  function handleEdit(id) {
    try {
      axios.put(`${URL}/${id}`, newData);
      setData(
        data.map((data) => (data.id === id ? { ...data, ...newData } : data))
      );
      setShow(false);
      setUpdateDataId(null);
      setNewData({
        name: "",
        grade: [],
        status: "",
        examDate: null,
        subject: [],
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  function handleDelete(id) {
    try {
      axios.delete(`${Url}/${id}`);
      setData(data.filter((data) => data.id !== id));
      setSelectedId(null);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  return (
    <div>
      <div className="mr-2 ">
        <div style={{ fontWeight: 600, fontSize: 24 }}>Quản Lý Điểm</div>
        <Button variant="success">
          <img src="" alt="Add" onClick={handleAdd} />
        </Button>
      </div>
      <div className="container mt-4">
        <div className="row row-cols-2">
          <div className="col-sm-6">
            <General
              data={data}
              handleViewData={handleViewData}
              selectedId={selectedId}
              handleDelete={handleDelete}
              handleShowUpdateForm={handleShowUpdateForm}
            />
          </div>
          {selectedId && (
            <div className="col">
              <Infor data={data} selectedId={selectedId} />
            </div>
          )}
          {selectedId && (
            <div className="col">
              <Detail data={data} selectedId={selectedId} />
            </div>
          )}
          {show && updateDataId && (
            <UpdateForm
              show={show}
              handleClose={handleClose}
              handleSave={handleEdit}
              dataRow={dataRow}
              updateDataId={updateDataId}
              setNewData={setNewData}
              newData={newData}
              // handleNewData={handleNewData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Infor({ data, selectedId }) {
  const reData = data.filter((data, i) => data.id === selectedId);
  const { name, classes, image } = reData[0];

  return (
    <div>
      <span style={{ fontWeight: 450, fontSize: 20 }}>Infor</span>
      <div>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Class</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedId}</td>
              <td>{name}</td>
              <td>{classes}</td>
              <td>{image}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function Detail({ data, selectedId }) {
  const reData = data.filter((data, i) => data.id === selectedId);
  const { name, grade, status, examDate, subject } = reData[0];
  return (
    <div>
      <span style={{ fontWeight: 450, fontSize: 20 }}>Detail</span>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Exam Date</th>
              <th>Scores</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedId}</td>
              <td>{name}</td>
              {subject.map((sub, i) => (
                <tr key={i}>
                  <td>{sub}</td>
                </tr>
              ))}
              <td>{status}</td>
              <td>{examDate}</td>
              {grade.map((score, i) => (
                <tr key={i}>
                  <td>{score}</td>
                </tr>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function General({ data, handleViewData, handleDelete, handleShowUpdateForm }) {
  return (
    <div>
      <div style={{ fontWeight: 450, fontSize: 20 }}>General</div>
      <div>
        <Table bordered hover scrolled>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Score</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={index}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.grade}</td>
                <td>{data.status}</td>
                <td>
                  <Button className="m-2" variant="danger">
                    <img
                      src="delete.png"
                      alt="delete"
                      onClick={() => handleDelete(data.id)}
                    />
                  </Button>
                  <Button className="m-2" variant="success">
                    <img
                      src="delete.png"
                      alt="view"
                      onClick={() => handleViewData(data.id)}
                    />
                  </Button>
                  <Button variant="success">
                    <img
                      src="edit.png"
                      alt="edit"
                      onClick={() => handleShowUpdateForm(data)}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function UpdateForm({
  show,
  handleClose,
  dataRow,
  handleSave,
  updateDataId,
  handleNewData,
  newData,
  setNewData,
}) {
  // const reData = data.filter((data, i) => data.id === updateDataId);
  // const { name, grade, status, examDate, subject } = reData[0];
  // console.log(updateDataId);
  // console.log(dataRow);

  const updateField = (field, value) => {
    setNewData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update</Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        <Form className="row row-cols-2">
          <div className="col">
            <span>Infor</span>
            <Form.Group className="mb-3">
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" placeholder={updateDataId} disabled />
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                // placeholder={name}
                value={newData.name || dataRow.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                // placeholder={status}
                onChange={(e) =>
                  setNewData({ ...newData, status: e.target.value })
                }
              />
            </Form.Group>
          </div>
          <div className="col">
            <span>Detail</span>
            <Form.Group className="mb-3">
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" placeholder={updateDataId} disabled />
              <Form.Label>Subject</Form.Label>
              {/* {subject.map((sub, i) => (
                <FormGroup>
                  <Form.Control
                    type="text"
                    placeholder={sub}
                    onChange={(e) =>
                      setNewData({ ...newData, subject: e.target.value })
                    }
                  />
                </FormGroup>
              ))} */}
              <Form.Label>Exam Date</Form.Label>
              <Form.Control
                type="text"
                // placeholder={examDate}
                value={dataRow.name}
                onChange={(e) =>
                  setNewData({ ...newData, examDate: e.target.value })
                }
              />
              <Form.Label>Score</Form.Label>
              {dataRow.grade.map((score, i) => (
                <FormGroup>
                  <Form.Control
                    type="number"
                    // placeholder={score}
                    value={score}
                    onChange={(e) =>
                      setNewData({ ...newData, score: e.target.value })
                    }
                  />
                </FormGroup>
              ))}
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => updateDataId && handleSave(updateDataId)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
