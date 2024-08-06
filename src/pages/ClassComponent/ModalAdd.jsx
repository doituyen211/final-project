import React from "react";
import ModalComponent from "../../components/ModalComponent";

const ModalAdd = ({ showAddModal, setShowAddModal }) => {
  return (
    <ModalComponent
      show={showAddModal}
      modalTitle={"Thêm mới lớp học"}
      setShowAddModal={setShowAddModal}
    >
      <p>Your modal content here.</p>
    </ModalComponent>
  );
};

export default ModalAdd;
