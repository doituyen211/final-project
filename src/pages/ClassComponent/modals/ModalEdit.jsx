import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useEditClass, useGetTrainingProgram } from "../hooks";
import useClassStore from "../useClassStore";

const ModalEdit = () => {
  const [form] = Form.useForm();
  const showModalEdit = useClassStore((state) => state.showModalEdit);
  const dataRow = useClassStore((state) => state.dataRow);
  const handleClose = useClassStore((state) => state.handleClose);
  const { handleEditClass, isPending } = useEditClass(dataRow.id, form);
  const { data } = useGetTrainingProgram();

  useEffect(() => {
    if (dataRow) {
      form.setFieldsValue({
        programName: dataRow.trainingProgramName,
        className: dataRow.className,
        classSize: dataRow.classSize,
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
      centered
      footer={
        <>
          <Button onClick={handleClose}>Đóng</Button>
          <Button type="primary" onClick={handleEditClass} loading={isPending}>
            Cập nhật
          </Button>
        </>
      }
    >
      <Form form={form} labelCol={{ span: 10 }} className="mt-4">
        <Form.Item
          label="Tên chương trình đào tạo"
          name="programName"
          required={false}
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
              value: option.program_name,
              label: option.program_name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Tên lớp"
          name="className"
          required={false}
          rules={[{ required: true, message: "Vui lòng nhập tên lớp" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Sĩ số" name="classSize">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" name="startDate">
          <DatePicker disabled />
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          required={false}
          rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
