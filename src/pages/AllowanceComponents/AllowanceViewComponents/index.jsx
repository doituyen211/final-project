// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
//
// function AllowanceViewComponents({ show, handleClose, item, mode }) {
//     const [viewState, setViewState] = useState({ ...item });
//
//     useEffect(() => {
//         setViewState({ ...item });
//     }, [item]);
//
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{mode === 'view' ? 'View Allowance' : 'Edit Allowance'}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group controlId="idCV">
//                         <Form.Label>ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="idCV"
//                             value={viewState.idCV}
//                             readOnly={mode === 'view'}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="loaiPC">
//                         <Form.Label>Loại Phụ Cấp</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="loaiPC"
//                             value={viewState.loaiPC}
//                             readOnly={mode === 'view'}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="luongPC">
//                         <Form.Label>Lương Phụ Cấp</Form.Label>
//                         <Form.Control
//                             type="number"
//                             name="luongPC"
//                             value={viewState.luongPC}
//                             readOnly={mode === 'view'}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="trangThai">
//                         <Form.Check
//                             type="checkbox"
//                             name="trangThai"
//                             label="Trạng Thái"
//                             checked={viewState.trangThai}
//                             readOnly={mode === 'view'}
//                             disabled={mode === 'view'}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="ngaySua">
//                         <Form.Label>Ngày Sửa</Form.Label>
//                         <Form.Control
//                             type="date"
//                             name="ngaySua"
//                             value={viewState.ngaySua}
//                             readOnly={mode === 'view'}
//                         />
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//                 {mode !== 'view' && (
//                     <Button variant="primary">
//                         Save Changes
//                     </Button>
//                 )}
//             </Modal.Footer>
//         </Modal>
//     );
// }
//
// export default AllowanceViewComponents;
