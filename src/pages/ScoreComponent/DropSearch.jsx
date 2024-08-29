import Select from "react-select";
import { Card, CardBody, CardFooter, Button } from "react-bootstrap";
import React from "react";

export default function DropSearch({ data }) {
  const [selectedOption, setSelectedOption] = React.useState(null);

  //   console.log(status);

  const trainningProgramOptions = [
    { value: "Trainning Program", label: "Trainning Program" },
    { value: "Trainning Program1", label: "Trainning Program1" },
    { value: "Trainning Program2", label: "Trainning Program2" },
    { value: "Trainning Program3", label: "Trainning Program3" },
  ];

  const subjectOption = [];
  const yearOption = [];
  const statusOption = [];

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
      </CardFooter>
    </Card>
  );
}
