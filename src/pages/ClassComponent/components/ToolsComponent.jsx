import ModalAdd from "../modals/ModalAdd";
import ModalDelete from "../modals/ModalDelete";
import ModalEdit from "../modals/ModalEdit";
import ModalView from "../modals/ModalView";
import ButtonAddComponent from "./ButtonAddComponent";
import SearchComponent from "./SearchComponent";

const ToolsComponent = () => {
  return (
    <div className="d-flex align-items-center justify-content-between">
      <SearchComponent />
      <ButtonAddComponent />
      <ModalAdd />
      <ModalView />
      <ModalDelete />
      <ModalEdit />
    </div>
  );
};

export default ToolsComponent;
