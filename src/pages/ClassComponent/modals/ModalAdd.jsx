import { DatePicker, Form, Input, Modal } from "antd";
import { Button } from "react-bootstrap";
import { useAddNewClass } from "../hooks";
import useClassStore from "../useClassStore";

const ModalAdd = () => {
  const [form] = Form.useForm();
  const showModalAdd = useClassStore((state) => state.showModalAdd);
  const handleClose = useClassStore((state) => state.handleClose);
  const { mutation } = useAddNewClass();

  const handleAddNew = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          startDate: values.startDate.format("YYYY-MM-DD"),
          endDate: values.endDate.format("YYYY-MM-DD"),
        };
        mutation.mutate(formattedValues);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

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
          <Input placeholder="Nhập tên chương trình đào tạo" />
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
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
