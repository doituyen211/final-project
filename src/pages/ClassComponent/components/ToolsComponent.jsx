import ModalAdd from "../modals/ModalAdd";
import ModalDelete from "../modals/ModalDelete";
import ModalEdit from "../modals/ModalEdit";
import ModalView from "../modals/ModalView";
import ButtonAddComponent from "./ButtonAddComponent";
import SearchComponent from "./SearchComponent";
import TimeComponent from "./TimeComponent";

const ToolsComponent = () => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <SearchComponent />
        <TimeComponent />
        <ButtonAddComponent />
        {/* <div className="d-flex align-items-center"></div> */}
      </div>
      <ModalAdd />
      <ModalView />
      <ModalDelete />
      <ModalEdit />
    </div>
  );
};

export default ToolsComponent;
