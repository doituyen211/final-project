import { Button, Form, Input, Modal } from "antd";
import { useAddNewClass } from "../hooks";
import useClassStore from "../useClassStore";
import { SelectTrainingProgram } from "../components/SelectTrainingProgram";
import { DatePickerComponent } from "../components/DatePickerComponent";

const ModalAdd = () => {
  const [form] = Form.useForm();
  const showModalAdd = useClassStore((state) => state.showModalAdd);
  const handleClose = useClassStore((state) => state.handleClose);
  const { handleAddNew, isPending } = useAddNewClass(form);
  const handleCloseAll = () => {
    form.resetFields();
    handleClose();
  };

  return (
    <Modal
      title="Thêm mới lớp học"
      open={showModalAdd}
      onCancel={handleCloseAll}
      centered
      footer={
        <>
          <Button onClick={handleCloseAll}>Đóng</Button>
          <Button type="primary" onClick={handleAddNew} loading={isPending}>
            Thêm mới
          </Button>
        </>
      }
    >
      <Form form={form} labelCol={{ span: 10 }} className="mt-4">
        <SelectTrainingProgram />

        <Form.Item
          label="Tên lớp"
          name="className"
          required={false}
          rules={[{ required: true, message: "Hãy nhập tên lớp" }]}
        >
          <Input placeholder="Nhập tên lớp" />
        </Form.Item>

        {/* <Form.Item
          label="Sĩ số"
          name="classSize"
          required={false}
          rules={[
            { required: true, message: "Hãy nhập sĩ số lớp" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || !isNaN(Number(value))) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Sĩ số phải là số"));
              },
            }),
          ]}
        >
          <Input placeholder="Nhập sĩ số" />
        </Form.Item> */}

        <DatePickerComponent
          label={"Ngày bắt đầu"}
          name={"startDate"}
          message={"Hãy chọn ngày bắt đầu"}
          placeholder={"Chọn ngày bắt đầu"}
        />

        <DatePickerComponent
          label={"Ngày kết thúc"}
          name={"endDate"}
          message={"Hãy chọn ngày kết thúc"}
          placeholder={"Chọn ngày kết thúc"}
        />
      </Form>
    </Modal>
  );
};

export default ModalAdd;
