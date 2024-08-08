import axios from "axios";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function ScoreComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedId, setSelectedId] = useState(0);

  const getUrl = "https://66b2e33c7fba54a5b7eab653.mockapi.io/grades/grade";
  /* param: id, name , grade, examDate, subject*/

  const url = "https://freetestapi.com/api/v1/students ";
  // param: id, name, age, gender, address, email, phone, courses, gpa, image

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getUrl);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error.message}</p>;

  const handleViewData = (id) => {
    setSelectedId(id);
  };

  return (
    <div>
      <div
        style={{ fontWeight: 600, fontSize: 24 }}
        className="mr-2 bg-success-subtle "
      >
        <span>Quản Lý Điểm</span>
      </div>
      <div className="container">
        <div className="row row-cols-2">
          {selectedId && (
            <div className="col">
              <Infor data={data} selectedId={selectedId} />
            </div>
          )}
          <div className="col-sm-6">
            <General data={data} handleViewData={handleViewData} />
          </div>
          {selectedId && (
            <div className="col">
              <Detail data={data} selectedId={selectedId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Infor({ data, selectedId }) {
  const { name, classes, image } = data[selectedId];

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
  const { name, subject, examDate, grade } = data[selectedId];
  //   console.log(subject);
  return (
    <div>
      <span style={{ fontWeight: 450, fontSize: 20 }}>Detail</span>
      <div>
        <Table bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Exam Date</th>
              <th>Scores</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedId}</td>
              <td>{name}</td>
              {subject.map((sub, i) => (
                <tr>
                  <td key={i}>{sub}</td>
                </tr>
              ))}
              <td>{examDate}</td>
              {grade.map((score, i) => (
                <tr>
                  <td key={i}>{score}</td>
                </tr>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function General({ data, handleViewData }) {
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
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={index} onClick={() => handleViewData(data.id)}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.grade}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
