// import React from "react";
// import { Modal, Button } from "react-bootstrap";

// const DeleteComponent = ({ show, onHide, onDelete }) => {
//     return (
//         <Modal show={show} onHide={onHide}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Xác nhận xóa</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>Bạn có chắc chắn muốn xóa mục này không?</Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onHide}>
//                     Hủy bỏ
//                 </Button>
//                 <Button variant="danger" onClick={onDelete}>
//                     Xóa
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default DeleteComponent;
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteComponent = ({ show, onHide, onDelete }) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="primary" onClick={onDelete}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
);

export default DeleteComponent;
