import { DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useEditClass } from "../hooks";
import useClassStore from "../useClassStore";

const ModalEdit = () => {
  const [form] = Form.useForm();
  const showModalEdit = useClassStore((state) => state.showModalEdit);
  const dataRow = useClassStore((state) => state.dataRow);
  const handleClose = useClassStore((state) => state.handleClose);
  const { mutation } = useEditClass(dataRow.id);

  useEffect(() => {
    if (dataRow) {
      form.setFieldsValue({
        trProgramName: dataRow.trProgramName,
        name: dataRow.name,
        size: dataRow.size,
        startDate: moment(dataRow.startDate),
        endDate: moment(dataRow.endDate),
      });
    }
  }, [dataRow, form]);

  const handleEditClass = () => {
    const values = form.getFieldsValue();
    const formattedValues = {
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
    };
    mutation.mutate(formattedValues);
  };

  return (
    <Modal
      title="Chỉnh sửa lớp học"
      open={showModalEdit}
      onCancel={handleClose}
      footer={
        <>
          <Button className="btn btn-secondary mr-2" onClick={handleClose}>
            Đóng
          </Button>
          <Button className="btn btn-success" onClick={handleEditClass}>
            Cập nhật
          </Button>
        </>
      }
    >
      <Form form={form} labelCol={{ span: 10 }} className="mt-4">
        <Form.Item label="Tên chương trình đào tạo" name="trProgramName">
          <Input />
        </Form.Item>
        <Form.Item label="Tên lớp" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Sĩ số" name="size">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" name="startDate">
          <DatePicker disabled />
        </Form.Item>
        <Form.Item label="Ngày kết thúc" name="endDate">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
