import axios from 'axios';
import { useEffect, useState } from 'react';
import TableBodyComponents from '../../../components/TableBodyComponents';
import TableComponents from '../../../components/TableComponents';

const QualificationViewComponent = () => {
  const [qualifications, setQualifications] = useState([]);

  useEffect(() => {
    axios.get('/data/qualification/qualification-list.json')
      .then(response => {
        setQualifications(response.data);
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu!', error);
      });
  }, []);

  const rows = qualifications.map(qualification => ({
    data: [
      qualification.qualificationName,
      qualification.employeeName,
      qualification.position,
      qualification.status ? 'Active' : 'Inactive',
      qualification.createdAt,
      qualification.modifiedAt,
    ],
    actions: [
      {
        className: 'btn-info',
        icon: 'fa-eye',
        onClick: () => handleView(qualification.id),
      },
      {
        className: 'btn-warning',
        icon: 'fa-pen',
        onClick: () => handleEdit(qualification.id),
      },
      {
        className: 'btn-danger',
        icon: 'fa-trash',
        onClick: () => handleDelete(qualification.id),
      }
    ]
  }));

  const handleView = (id) => {
    // Xử lý xem chi tiết
    console.log('View:', id);
  };

  const handleEdit = (updatedQualification) => {
    axios.put(`/api/qualification/${updatedQualification.id}`, updatedQualification)
      .then(() => {
        setQualifications(qualifications.map(item =>
          item.id === updatedQualification.id ? updatedQualification : item
        ));
        setQualifications(qualifications.map(qualification =>
          qualification.id === updatedQualification.id ? updatedQualification : qualification
        ));
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi cập nhật bằng cấp !', error);
      });

  };

  const handleDelete = (id) => {
    console.log('Delete:', id);
  };

  return (
    <div className="col-8">
      <TableComponents
        headers={[
          'Tên bằng cấp', 'Nhân viên', 'Chức vụ', 'Trạng thái', 'Ngày tạo', 'Ngày sửa', "Lựa chọn"
        ]}
      >
        <TableBodyComponents rows={rows} />

      </TableComponents>
    </div>
  );
};

export default QualificationViewComponent;
