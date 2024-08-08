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
    const values = form.getFieldsValue();
    const formattedValues = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };
    mutation.mutate(formattedValues);
    form.resetFields();
  };

  return (
    <Modal
      title="Thêm mới lớp học"
      open={showModalAdd}
      onCancel={handleClose}
      footer={
        <>
          <Button className="btn btn-secondary mr-2">Đóng</Button>
          <Button className="btn btn-success" onClick={handleAddNew}>
            Thêm mới
          </Button>
        </>
      }
    >
      <Form form={form} labelCol={{ span: 10 }} className="mt-4">
        <Form.Item label="Tên chương trình đào tạo" name="trProgramName">
          <Input placeholder="Nhập tên chương trình đào tạo" />
        </Form.Item>
        <Form.Item label="Tên lớp" name="name">
          <Input placeholder="Nhập tên lớp" />
        </Form.Item>
        <Form.Item label="Sĩ số" name="size">
          <Input placeholder="Nhập sĩ số" />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" name="startDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Ngày kết thúc" name="endDate">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
