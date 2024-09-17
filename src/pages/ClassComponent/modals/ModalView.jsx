import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import TableNoActions from "../components/TableNoActions";
import useClassStore from "../useClassStore";

const ModalView = () => {
  const dataRow = useClassStore((state) => state.dataRow);
  const showModalView = useClassStore((state) => state.showModalView);
  const handleClose = useClassStore((state) => state.handleClose);
  const [formViewData, setFormViewData] = useState(dataRow);

  useEffect(() => {
    setFormViewData(dataRow);
  }, [dataRow]);

  return (
    <Modal
      title="Thông tin lớp học"
      open={showModalView}
      onCancel={handleClose}
      footer={<Button onClick={handleClose}>Đóng</Button>}
      centered
    >
      <div className="d-flex justify-content-between my-4">
        <div className="d-flex  flex-column gap-3">
          <div>
            Tên lớp: <b>{formViewData.className}</b>
          </div>
          <div>
            Tên chương trình đào tạo: <b>{formViewData.trainingProgramName}</b>
          </div>
        </div>
        <div>
          Sĩ số: <b>{formViewData.classSize}</b>
        </div>
      </div>
      <TableNoActions />
    </Modal>
  );
};

export default ModalView;
