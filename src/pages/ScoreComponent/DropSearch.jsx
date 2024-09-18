import Select from "react-select";
import { Card, CardBody, CardFooter, Button } from "react-bootstrap";
import React from "react";

export default function DropSearch({ data, onSearch }) {
  // const [selectedOption, setSelectedOption] = React.useState(null);

  const [trainningProgram, setTrainningProgram] = React.useState(null);
  const [subject, setSubject] = React.useState(null);
  const [year, setYear] = React.useState(null);
  const [status, setStatus] = React.useState(null);

  const trainningProgramOptions = Array.from(
    new Set(data.map((item) => item.programName))
  ).map((program) => ({
    value: program,
    label: program,
  }));

  const subjectOption = Array.from(
    new Set(data.map((item) => item.subjectName))
  ).map((subject) => ({
    value: subject,
    label: subject,
  }));

  const yearOption = Array.from(
    new Set(data.map((item) => item.courseName))
  ).map((course) => ({
    value: course,
    label: course,
  }));

  const statusOption = Array.from(new Set(data.map((item) => item.status))).map(
    (status) => ({
      value: status,
      label: status,
    })
  );

  const handleSearch = () => {
    onSearch({
      trainningProgram: trainningProgram ? trainningProgram.value : null,
      subject: subject ? subject.value : null,
      year: year ? year.value : null,
      status: status ? status.value : null,
    });
  };

  const cancelSelect = () => {
    setTrainningProgram(null);
    setSubject(null);
    setYear(null);
    setStatus(null);
  };

  return (
    <Card>
      <CardBody className="container">
        <div className="grid text-center">
          <div className="g-col-4">
            <Select
              value={trainningProgram}
              onChange={setTrainningProgram}
              options={trainningProgramOptions}
              placeholder="Trainning Program"
            />
          </div>
          <div className="g-col-3">
            <Select
              value={subject}
              onChange={setSubject}
              options={subjectOption}
              placeholder="Subject"
            />
          </div>
          <div className="g-col-2">
            <Select
              value={year}
              onChange={setYear}
              options={yearOption}
              placeholder="Year"
            />
          </div>
          <div>
            <Select
              value={status}
              onChange={setStatus}
              options={statusOption}
              placeholder="Status"
            />
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={handleSearch}>Search</Button>
        <Button
          onClick={cancelSelect}
          className="text-body-secondary bg-body-secondary border border-0"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
