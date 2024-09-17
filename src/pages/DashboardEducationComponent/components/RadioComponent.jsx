import { Radio } from "antd";
import React from "react";
import { typeBarChart } from "../constants";

const RadioComponent = ({ type, setType }) => {
  const onChange = (e) => {
    setType(e.target.value);
  };

  return (
    <Radio.Group
      onChange={onChange}
      value={type}
      className="position-absolute"
      style={{ top: "90px", right: "30px" }}
    >
      {typeBarChart?.map((item) => (
        <Radio value={item.value}>{item.labels}</Radio>
      ))}
    </Radio.Group>
  );
};

export default RadioComponent;
