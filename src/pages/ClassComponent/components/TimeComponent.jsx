import { DatePicker } from "antd";
import { Button } from "antd";
import useClassStore from "../useClassStore";
import { useState } from "react";
import moment from "moment/moment";
import { AiOutlineClear } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";

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
  };

  const handleClearDates = () => {
    setStoreStartDate("");
    setStoreEndDate("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="d-flex gap-4">
      <DatePicker
        onChange={handleStartDateChange}
        placeholder="Ngày bắt đầu"
        value={storeStartDate ? moment(storeStartDate) : null}
      />
      <DatePicker
        onChange={handleEndDateChange}
        placeholder="Ngày kết thúc"
        value={storeEndDate ? moment(storeEndDate) : null}
      />
      <Button onClick={handleStore}>
        <IoMdSearch size={20} />
      </Button>
      <Button onClick={handleClearDates}>
        <AiOutlineClear size={20} />
      </Button>
    </div>
  );
};

export default TimeComponent;
