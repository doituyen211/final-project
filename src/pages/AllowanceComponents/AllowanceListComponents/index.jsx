import React from 'react';
import { Table, Button } from 'react-bootstrap';

function AllowanceListComponents({ data, handleEdit, handleDelete }) {
    // Ensure data is an array before mapping
    if (!Array.isArray(data)) {
        return <div>Error: Data is not an array.</div>;
    }

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>ID Chức vụ</th>
                <th>Loại phụ cấp</th>
                <th>Lương phụ cấp</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Ngày sửa</th>
                <th>Hoạt động</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.idCV}</td>
                    <td>{item.loaiPC}</td>
                    <td>{item.luongPC}</td>
                    <td>{item.trangThai ? 'Hoạt động' : 'Không hoạt động'}</td>
                    <td>{item.create_at}</td>
                    <td>{item.update_at}</td>
                    <td>
                        <Button variant="info" onClick={() => handleEdit(item)}>Xem</Button>{' '}
                        <Button variant="warning" onClick={() => handleEdit(item)}>Sửa</Button>{' '}
                        <Button variant="danger" onClick={() => handleDelete(item)}>Xóa</Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}


export default AllowanceListComponents;
