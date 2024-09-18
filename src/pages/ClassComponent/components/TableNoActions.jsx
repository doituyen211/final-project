import { Table } from "antd";
import { useGetStudentByClassId } from "../hooks";
import useClassStore from "../useClassStore";
import { TableNoActionCols } from "../constants";

const TableNoActions = () => {
  const dataRow = useClassStore((state) => state.dataRow);
  const { data } = useGetStudentByClassId(dataRow.id);
  const cols = TableNoActionCols();

  return <Table dataSource={data} columns={cols} size="small" />;
};

export default TableNoActions;
