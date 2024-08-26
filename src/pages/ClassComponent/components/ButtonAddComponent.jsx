import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import useClassStore from "../useClassStore";

const ButtonAddComponent = () => {
  const setShowModalAdd = useClassStore((state) => state.setShowModalAdd);
  return (
    <Button
      variant="primary"
      onClick={() => {
        setShowModalAdd(true);
      }}
      className="float-right d-flex align-items-center btn btn-success"
    >
      Thêm mới
      <div className="ml-1">
        <Plus size={22} />
      </div>
    </Button>
  );
};

export default ButtonAddComponent;
