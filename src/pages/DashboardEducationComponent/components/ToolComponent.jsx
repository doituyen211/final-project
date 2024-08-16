import { Radio } from "antd";
import React from "react";
import { typeBarChart } from "../constants";

const ToolComponent = ({ value, setValue }) => {
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="position-absolute " style={{ top: "90px", right: "0px" }}>
      <Radio.Group onChange={onChange} value={value}>
        {typeBarChart?.map((item) => (
          <Radio value={item.value}>{item.labels}</Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default ToolComponent;
