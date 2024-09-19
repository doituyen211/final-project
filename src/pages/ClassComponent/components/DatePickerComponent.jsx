import { DatePicker, Form } from "antd";
import moment from "moment";

export const DatePickerComponent = ({
  label,
  name,
  message = "",
  placeholder = "",
  disable = false,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      required={false}
      rules={[{ required: true, message: message }]}
    >
      <DatePicker
        placeholder={placeholder}
        style={{ width: "100%" }}
        disabledDate={(current) => current && current < moment().startOf("day")}
        disabled={disable}
      />
    </Form.Item>
  );
};
