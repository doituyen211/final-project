import { DatePicker } from "antd";
import { Button } from "antd";
import useClassStore from "../useClassStore";
import { useState } from "react";

const TimeComponent = () => {
  const [storeStartDate, setStoreStartDate] = useState("");
  const [storeEndDate, setStoreEndDate] = useState("");

  const setStartDate = useClassStore((state) => state.setStartDate);
  const setEndDate = useClassStore((state) => state.setEndDate);

  const handleStartDateChange = (date, dateString) => {
    setStoreStartDate(dateString);
  };

  const handleEndDateChange = (date, dateString) => {
    setStoreEndDate(dateString);
  };

  const handleStore = () => {
    setStartDate(storeStartDate);
    setEndDate(storeEndDate);

    console.log(storeStartDate);
    console.log(storeEndDate);
  };

  return (
    <div className="d-flex gap-4">
      <DatePicker onChange={handleStartDateChange} />
      <DatePicker onChange={handleEndDateChange} />
      <Button onClick={handleStore}>
        <i className="bi bi-search"></i>
      </Button>
    </div>
  );
};

export default TimeComponent;
