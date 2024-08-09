import { Table } from "antd";
import { useGetStudentByClassId } from "../hooks";
import useClassStore from "../useClassStore";

const TableNoActions = () => {
  const dataRow = useClassStore((state) => state.dataRow);
  const { data } = useGetStudentByClassId(dataRow.id);
  const cols = [
    {
      dataIndex: "name",
      title: "Tên học viên",
    },
    {
      title: "Trạng thái",
      render: (_, record) => (
        <>
          {record.status ? (
            <span className="bg-success text-white rounded px-2 py-1">
              Đang học
            </span>
          ) : (
            <span className="bg-secondary text-white rounded px-2 py-1">
              Đã thôi học
            </span>
          )}
        </>
      ),
    },
  ];
  return <Table dataSource={data} columns={cols} size="small" />;
};

export default TableNoActions;
