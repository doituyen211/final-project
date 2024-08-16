import { Button, DatePicker } from "antd";

const TimeComponent = () => {
  return (
    <div className="d-flex gap-4">
      <DatePicker />
      <DatePicker />
      <Button variant="light" size="sm">
        <i className="bi bi-search"></i>
      </Button>
    </div>
  );
};

export default TimeComponent;
