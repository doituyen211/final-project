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
    >
      <div className="d-flex justify-content-between">
        <div className=" mb-3">
          <div>Tên lớp: {formViewData.name} </div>
          <div>Tên chương trình đào tạo: {formViewData.trProgramName}</div>
        </div>
        <div>Sĩ số: {formViewData.size}</div>
      </div>
      <TableNoActions />
    </Modal>
  );
};

export default ModalView;
