import { Button, Form, Input, Modal } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { SelectTrainingProgram } from "../components/SelectTrainingProgram";
import { DatePickerComponent } from "../components/DatePickerComponent";
import { useEditClass } from "../hooks";
import useClassStore from "../useClassStore";

const ModalEdit = () => {
  const [form] = Form.useForm();
  const showModalEdit = useClassStore((state) => state.showModalEdit);
  const dataRow = useClassStore((state) => state.dataRow);
  const handleClose = useClassStore((state) => state.handleClose);
  const { handleEditClass, isPending } = useEditClass(dataRow.id, form);

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
        <SelectTrainingProgram />

        <Form.Item
          label="Tên lớp"
          name="className"
          required={false}
          rules={[{ required: true, message: "Hãy nhập tên lớp" }]}
        >
          <Input placeholder="Nhập tên lớp" />
        </Form.Item>

        <Form.Item label="Sĩ số" name="classSize">
          <Input disabled />
        </Form.Item>

        <DatePickerComponent
          label={"Ngày bắt đầu"}
          name={"startDate"}
          disable={true}
        />

        <DatePickerComponent
          label={"Ngày kết thúc"}
          name={"endDate"}
          message={"Hãy chọn ngày kết thúc"}
          placeholder={"Chọn ngày kết thúc"}
          disable={false}
        />
      </Form>
    </Modal>
  );
};

export default ModalEdit;
