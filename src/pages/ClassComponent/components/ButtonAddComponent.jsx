import { Plus } from "react-bootstrap-icons";
import useClassStore from "../useClassStore";
import { Button } from "antd";

const ButtonAddComponent = () => {
  const setShowModalAdd = useClassStore((state) => state.setShowModalAdd);
  return (
    <Button
      type="primary"
      onClick={() => {
        setShowModalAdd(true);
      }}
      className="d-flex align-items-center"
    >
      Thêm mới
      <div>
        <Plus size={20} />
      </div>
    </Button>
  );
};

export default ButtonAddComponent;
