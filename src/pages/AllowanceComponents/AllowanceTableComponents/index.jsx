import React from 'react';
import { Table } from 'react-bootstrap';

function AllowanceTableComponents() {
    // Fetch data from API or local state
    const [data, setData] = React.useState([]);

    const handleEdit = (item) => {
        // Implement logic to edit item
        console.log('Edit item:', item);
    };

    const handleDelete = (item) => {
        // Implement logic to delete item
        console.log('Delete item:', item);
    };

    React.useEffect(() => {
        // Fetch data from API or local state
        fetch('https://66ad1d32b18f3614e3b4736d.mockapi.io')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
                    <td>{item.trangThai ? 'Active' : 'Inactive'}</td>
                    <td>{item.create_at}</td>
                    <td>{item.update_at}</td>
                    <td>
                        <button onClick={() => handleEdit(item)}>Edit</button>
                        <button onClick={() => handleDelete(item)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default AllowanceTableComponents;
