import { Form, Select } from "antd";
import { useGetTrainingProgram } from "../hooks";

export const SelectTrainingProgram = () => {
  const { data } = useGetTrainingProgram();
  return (
    <Form.Item
      label="Tên chương trình đào tạo"
      name="programName"
      required={false}
      rules={[
        {
          required: true,
          message: "Hãy chọn chương trình đào tạo",
        },
      ]}
    >
      <Select
        placeholder="Chọn chương trình đào tạo"
        options={data?.map((option) => ({
          value: option.program_name,
          label: option.program_name,
        }))}
      />
    </Form.Item>
  );
};
