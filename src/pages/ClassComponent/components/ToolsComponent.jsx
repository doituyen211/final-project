import ModalAdd from "../modals/ModalAdd";
import ModalCommon from "../modals/ModalCommon";
import useClassStore from "../useClassStore";
import ButtonAddComponent from "./ButtonAddComponent";
import SearchComponent from "./SearchComponent";

const ToolsComponent = () => {
  const setShowModalAdd = useClassStore((state) => state.setShowModalAdd);
  const setShowModalCommon = useClassStore((state) => state.setShowModalCommon);

  return (
    <div className="d-flex align-items-center justify-content-between">
      <SearchComponent />
      <ButtonAddComponent />
      <ModalAdd />
      <ModalCommon />
    </div>
  );
};

export default ToolsComponent;
