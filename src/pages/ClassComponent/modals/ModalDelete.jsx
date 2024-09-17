import { Button, Modal } from "antd";
import { useDeleteClass } from "../hooks";
import useClassStore from "../useClassStore";

const ModalDelete = () => {
  const showModalDelete = useClassStore((state) => state.showModalDelete);
  const handleClose = useClassStore((state) => state.handleClose);
  const dataRow = useClassStore((state) => state.dataRow);
  const { mutation, isPending } = useDeleteClass(dataRow.id);

  return (
    <Modal
      title="Xóa lớp học"
      open={showModalDelete}
      onCancel={handleClose}
      centered
      footer={
        <>
          <Button onClick={handleClose}>Đóng</Button>
          <Button danger onClick={mutation.mutate} loading={isPending}>
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
