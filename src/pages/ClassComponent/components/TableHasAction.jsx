import { Table } from "antd";
import { Button } from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { useGetClassList } from "../hooks";
import useClassStore from "../useClassStore";

const TableHasAction = () => {
  const setDataRow = useClassStore((state) => state.setDataRow);
  const setShowModalView = useClassStore((state) => state.setShowModalView);
  const setShowModalDelete = useClassStore((state) => state.setShowModalDelete);
  const setShowModalEdit = useClassStore((state) => state.setShowModalEdit);

  const { data } = useGetClassList();

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

  const cols = [
    {
      dataIndex: "trProgramName",
      title: "Tên chương trình đào tạo",
    },
    {
      dataIndex: "name",
      title: "Tên lớp",
    },
    {
      dataIndex: "size",
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
            variant="light"
            className="me-2"
            onClick={() => handleView(record)}
          >
            <BsEye />
          </Button>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleEdit(record)}
          >
            <BsPencil />
          </Button>

          <Button variant="danger" onClick={() => handleDelete(record)}>
            <BsTrash />
          </Button>
        </>
      ),
    },
  ];

  return <Table dataSource={data} columns={cols} size="small" />;
};

export default TableHasAction;
