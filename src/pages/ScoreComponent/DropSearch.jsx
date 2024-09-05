import Select from "react-select";
import { Card, CardBody, CardFooter, Button } from "react-bootstrap";
import React from "react";

export default function DropSearch({ data }) {
  const [selectedOption, setSelectedOption] = React.useState(null);

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

  return (
    <Card>
      <CardBody className="container">
        <div className="grid text-center">
          <div className="g-col-4">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={trainningProgramOptions}
              placeholder="Trainning Program"
            />
          </div>
          <div className="g-col-3">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={subjectOption}
              placeholder="Subject"
            />
          </div>
          <div className="g-col-2">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={yearOption}
              placeholder="Year"
            />
          </div>
          <div>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={statusOption}
              placeholder="Status"
            />
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Button type="submit">Search</Button>
        <Button className="text-body-secondary bg-body-secondary border border-0">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
