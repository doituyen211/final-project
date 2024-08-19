import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import useClassStore from "../useClassStore";

const ButtonAddComponent = () => {
<<<<<<<< HEAD:src/pages/ClassComponent/components/ButtonAddComponent.jsx
  const setShowModalCommon = useClassStore((state) => state.setShowModalCommon);
  const setModeModal = useClassStore((state) => state.setModeModal);
========
  const setShowModalAdd = useClassStore((state) => state.setShowModalAdd);
  const setMode = useClassStore((state) => state.setMode);
>>>>>>>> crm-hr:src/pages/ReservationComponent/components/ButtonAddComponent.jsx

  return (
    <Button
      variant="primary"
      onClick={() => {
<<<<<<<< HEAD:src/pages/ClassComponent/components/ButtonAddComponent.jsx
        setShowModalCommon(true);
        setModeModal(false);
========
        setShowModalAdd(true);
        setMode(false);
>>>>>>>> crm-hr:src/pages/ReservationComponent/components/ButtonAddComponent.jsx
      }}
      className="float-right mb-3 d-flex align-items-center"
    >
      Thêm mới
      <div className="ml-1">
        <Plus size={22} />
      </div>
    </Button>
  );
};

export default ButtonAddComponent;
