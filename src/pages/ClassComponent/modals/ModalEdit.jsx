import { DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useEditClass, useGetTrainingProgram } from "../hooks";
import useClassStore from "../useClassStore";

const ModalEdit = () => {
  const [form] = Form.useForm();
  const showModalEdit = useClassStore((state) => state.showModalEdit);
  const dataRow = useClassStore((state) => state.dataRow);
  const handleClose = useClassStore((state) => state.handleClose);
  const { handleEditClass } = useEditClass(dataRow.id, form);
  const { data } = useGetTrainingProgram();

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
  }, [dataRow, form, showModalEdit]);

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
          <Input />
        </Form.Item>
        <Form.Item label="Sĩ số" name="size">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" name="startDate">
          <DatePicker disabled />
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

export default ModalEdit;
