import axios from "axios";
import { Table, Modal, Form, ModalHeader, ModalBody } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ScoreComponent() {
  const [data, setData] = useState([]);
  const [dataRow, setDataRow] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [updateDataId, setUpdateDataId] = useState(null);
  const [show, setShow] = useState(false);
  const [scoreNew, setNewScore] = useState([]);

  const Url = "https://66b2e33c7fba54a5b7eab653.mockapi.io/grades/grade";

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

  if (loading)
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
        <div class="spinner-grow text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p>Error occurred: {error.message}</p>;

  const handleViewData = (id) => {
    setSelectedId(id);
  };

  const handleShowUpdateForm = (data) => {
    setShow(true);
    setUpdateDataId(data.id);
    setDataRow(data);
    setNewScore([...data.grade]);
  };

  const handleSaveNewScore = (e, index) => {
    const value = e.target.value;
    setNewScore((prevData) => {
      const updatedScores = [...prevData];
      updatedScores[index] = value;
      return updatedScores;
    });
  };

  function handleDelete(id) {
    try {
      axios.delete(`${Url}/${id}`);
      setData(data.filter((data) => data.id !== id));
      setSelectedId(null);
      toast.success("Record deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Failed to delete the record. Please try again.");
    }
  }

  function handleUpdateScore(e) {
    e.preventDefault();
    try {
      axios.put(`${Url}/${updateDataId}`, { ...dataRow, grade: scoreNew });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updateDataId ? { ...item, grade: scoreNew } : item
        )
      );
      setUpdateDataId(null);
      setShow(false);
      toast.success("Record update successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update the record. Please try again.");
    }
  }

  return (
    <div>
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
          <div className="col-sm-5">
            {selectedId && (
              <>
                <Infor data={data} selectedId={selectedId} />
                <Detail data={data} selectedId={selectedId} />
              </>
            )}
          </div>
          {show && updateDataId && (
            <UpdateForm
              show={show}
              handleClose={() => setShow(false)}
              dataRow={dataRow}
              handleSaveNewScore={handleSaveNewScore}
              handleUpdateScore={handleUpdateScore}
              scoreNew={scoreNew}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

function Infor({ data, selectedId }) {
  const reData = data.find((item) => item.id === selectedId);
  const { name, classes, image } = reData;

  return (
    <div>
      <span style={{ fontWeight: 450, fontSize: 20 }}>Infor</span>
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{ width: "4%", border: "1px solid black" }}>Id</th>
            <th style={{ width: "4%", border: "1px solid black" }}>Name</th>
            <th style={{ width: "4%", border: "1px solid black" }}>Class</th>
            <th style={{ width: "4%", border: "1px solid black" }}>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black" }}>{selectedId}</td>
            <td style={{ border: "1px solid black" }}>{name}</td>
            <td style={{ border: "1px solid black" }}>{classes}</td>
            <td style={{ border: "1px solid black" }}>{image}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function Detail({ data, selectedId }) {
  const reData = data.find((item) => item.id === selectedId);
  const { grade, status, examDate, subject } = reData;

  return (
    <div>
      <span style={{ fontWeight: 450, fontSize: 20 }}>Detail</span>
      <Table bordered>
        <thead>
          <tr>
            <th style={{ width: "4%", border: "1px solid black" }}>Id</th>
            <th style={{ width: "4%", border: "1px solid black" }}>Subject</th>
            <th style={{ width: "4%", border: "1px solid black" }}>Status</th>
            <th style={{ width: "4%", border: "1px solid black" }}>
              Exam Date
            </th>
            <th style={{ width: "4%", border: "1px solid black" }}>Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black" }}>{selectedId}</td>
            <td style={{ border: "1px solid black" }}>{subject.join(", ")}</td>
            <td style={{ border: "1px solid black" }}>{status}</td>
            <td style={{ border: "1px solid black" }}>{examDate}</td>
            <td style={{ border: "1px solid black" }}>
              {grade.map((score, i) => (
                <div key={i}>{score}</div>
              ))}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function General({ data, handleViewData, handleDelete, handleShowUpdateForm }) {
  return (
    <div>
      <div style={{ fontWeight: 450, fontSize: 20 }}>General</div>
      <Table bordered hover>
        <thead>
          <tr>
            <th style={{ height: "4%", border: "1px solid black" }}>Id</th>
            <th style={{ height: "4%", border: "1px solid black" }}>Name</th>
            <th style={{ height: "4%", border: "1px solid black" }}>Score</th>
            <th style={{ height: "4%", border: "1px solid black" }}>Status</th>
            <th
              style={{ height: "4%", weight: "4%", border: "1px solid black" }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black" }}>{item.id}</td>
              <td style={{ border: "1px solid black" }}>{item.name}</td>
              <td style={{ border: "1px solid black" }}>
                {item.grade.reduce((sum, num) => sum + Number(num), 0) /
                  item.grade.length}
              </td>
              <td style={{ border: "1px solid black" }}>{item.status}</td>
              <td style={{ border: "1px solid black" }}>
                <button
                  className="m-2 btn btn-secondary btn-sm"
                  onClick={() => handleViewData(item.id)}
                >
                  <i className="bi bi-eye"></i>
                </button>
                <button
                  className="m-2 btn btn-success btn-sm"
                  onClick={() => handleShowUpdateForm(item)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="m-2 btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="bi bi-x-octagon"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function UpdateForm({
  show,
  handleClose,
  dataRow,
  handleSaveNewScore,
  handleUpdateScore,
  scoreNew,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <span>Update</span>
      </ModalHeader>
      <ModalBody className="container">
        <Form className="row row-cols-2" onSubmit={handleUpdateScore}>
          <div className="col">
            <span>Infor</span>
            <div className="mb-3">
              <label className="m-2">Id</label>
              <input type="text" value={dataRow.id} disabled />
              <label className="m-2">Name</label>
              <input type="text" value={dataRow.name} disabled />
              <label className="m-2">Status</label>
              <input type="text" value={dataRow.status} disabled />
            </div>
          </div>
          <div className="col">
            <span>Detail</span>
            <div className="mb-3">
              <label className="m-2">Subject</label>
              {dataRow.subject.map((sub, i) => (
                <div className="m-2" key={i}>
                  <input type="text" value={sub} disabled />
                </div>
              ))}
              <label className="m-2">Exam Date</label>
              <input type="text" value={dataRow.examDate} disabled />
              <label className="m-2">Scores</label>
              {scoreNew.map((score, i) => (
                <input
                  type="number"
                  value={score}
                  onChange={(e) => handleSaveNewScore(e, i)}
                  key={i}
                />
              ))}
            </div>
          </div>
          <div>
            <button
              type="button"
              className="m-2 btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="m-2 btn btn-danger" type="submit">
              Save
            </button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
}
