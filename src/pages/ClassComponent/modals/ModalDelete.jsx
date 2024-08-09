import { Modal } from "antd";
import { Button } from "react-bootstrap";
import { useDeleteClass } from "../hooks";
import useClassStore from "../useClassStore";

const ModalDelete = () => {
  const showModalDelete = useClassStore((state) => state.showModalDelete);
  const handleClose = useClassStore((state) => state.handleClose);
  const dataRow = useClassStore((state) => state.dataRow);
  const { mutation } = useDeleteClass(dataRow.id);

  return (
    <Modal
      title="Xóa lớp học"
      open={showModalDelete}
      onCancel={handleClose}
      footer={
        <>
          <Button className="btn btn-secondary mr-2">Đóng</Button>
          <Button className="btn btn-danger" onClick={mutation.mutate}>
            Xóa
          </Button>
        </>
      }
    >
      Bạn có chắc muốn xóa lớp <b>{dataRow.name}</b> này không?
    </Modal>
  );
};

export default ModalDelete;
