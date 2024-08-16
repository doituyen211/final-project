import { DatePicker, Form, Input, Modal, Select } from "antd";
import { Button } from "react-bootstrap";
import { useAddNewClass, useGetTrainingProgram } from "../hooks";
import useClassStore from "../useClassStore";

const ModalAdd = () => {
  const [form] = Form.useForm();
  const showModalAdd = useClassStore((state) => state.showModalAdd);
  const handleClose = useClassStore((state) => state.handleClose);
  const { handleAddNew } = useAddNewClass(form);
  const { data } = useGetTrainingProgram();

  const handleCloseAll = () => {
    form.resetFields();
    handleClose();
  };

  return (
    <Modal
      title="Thêm mới lớp học"
      open={showModalAdd}
      onCancel={handleCloseAll}
      footer={
        <>
          <Button className="btn btn-secondary mr-2" onClick={handleCloseAll}>
            Đóng
          </Button>
          <Button className="btn btn-success" onClick={handleAddNew}>
            Thêm mới
          </Button>
        </>
      }
    >
      <Form form={form} labelCol={{ span: 10 }} className="mt-4">
        <Form.Item
          label="Tên chương trình đào tạo"
          name="trProgramName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên chương trình đào tạo",
            },
          ]}
        >
          <Select
            placeholder="Chọn chương trình đào tạo"
            options={data?.map((option) => ({
              value: option.id,
              label: option.programName,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Tên lớp"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên lớp" }]}
        >
          <Input placeholder="Nhập tên lớp" />
        </Form.Item>
        <Form.Item
          label="Sĩ số"
          name="size"
          rules={[
            { required: true, message: "Vui lòng nhập sĩ số" },
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
        </Form.Item>
        <Form.Item
          label="Ngày bắt đầu"
          name="startDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
        >
          <DatePicker
            placeholder="Chọn ngày bắt đầu"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
        >
          <DatePicker
            placeholder="Chọn ngày kết thúc"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
