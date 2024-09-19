import { Button } from "react-bootstrap";
import useClassStore from "./useClassStore";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";

export const studentListByClassIdCols = [
  {
    key: "name",
    label: "Tên học viên",
  },
  {
    key: "status",
    label: "Trạng thái",
  },
];

export const TableHasActionCols = () => {
  const setDataRow = useClassStore((state) => state.setDataRow);
  const setShowModalView = useClassStore((state) => state.setShowModalView);
  const setShowModalDelete = useClassStore((state) => state.setShowModalDelete);
  const setShowModalEdit = useClassStore((state) => state.setShowModalEdit);
  const handleView = (row) => {
    setShowModalView(true);
    setDataRow(row);
  };

  const handleEdit = (row) => {
    setDataRow(row);
    setShowModalEdit(true);
  };

  const handleDelete = (row) => {
    setShowModalDelete(true);
    setDataRow(row);
  };
  return [
    {
      dataIndex: "trainingProgramName",
      title: "Tên chương trình đào tạo",
    },
    {
      dataIndex: "className",
      title: "Tên lớp",
    },
    {
      dataIndex: "classSize",
      title: "Sĩ số",
    },
    {
      dataIndex: "startDate",
      title: "Ngày bắt đầu",
    },
    {
      dataIndex: "endDate",
      title: "Ngày kết thúc",
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <Button
            variant="link"
            className="me-2"
            onClick={() => handleView(record)}
          >
            <BsEye className="text-secondary" />
          </Button>
          <Button
            variant="link"
            className="me-2"
            onClick={() => handleEdit(record)}
          >
            <BsPencil className="text-primary" />
          </Button>

          <Button variant="link" onClick={() => handleDelete(record)}>
            <BsTrash className="text-danger" />
          </Button>
        </>
      ),
    },
  ];
};

export const TableNoActionCols = () => {
  return [
    {
      dataIndex: "studentName",
      title: "Tên học viên",
    },
    {
      dataIndex: "status",
      title: "Trạng thái",
      render: (_, record) => (
        <>
          {record.status ? (
            <span className="text-green">Đang học</span>
          ) : (
            <span className="text-gray">Đã thôi học</span>
          )}
        </>
      ),
    },
  ];
};
