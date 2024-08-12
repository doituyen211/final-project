import { Table } from "antd";
import { Button } from "react-bootstrap";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { useGetClassList } from "../hooks";
import useClassStore from "../useClassStore";
import React from "react";

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
            variant="link"
            className="me-2"
            onClick={() => handleView(record)}
          >
            <BsEye className="text-secondary"/>
          </Button>
          <Button
            variant="link"
            className="me-2"
            onClick={() => handleEdit(record)}
          >
            <BsPencil className="text-primary" />
          </Button>

          <Button variant="link" onClick={() => handleDelete(record)}>
            <BsTrash  className="text-danger"/>
          </Button>
        </>
      ),
    },
  ];

  return <Table dataSource={data} columns={cols} size="small" />;
};

export default TableHasAction;
