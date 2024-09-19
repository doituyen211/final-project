import React from 'react';
import { Table, Button } from 'react-bootstrap';

function AllowanceTableComponents({ data, onEdit, onDelete }) {
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
                        <Button variant="info" onClick={() => onEdit(item)}>Xem</Button>
                        <Button variant="warning" onClick={() => onEdit(item)}>Sửa</Button>
                        <Button variant="danger" onClick={() => onDelete(item)}>Xóa</Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default AllowanceTableComponents;
