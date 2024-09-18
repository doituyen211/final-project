import { Table } from "antd";
import { TableHasActionCols } from "../constants";
import { useGetClassList } from "../hooks";

const TableHasAction = () => {
  const { data, isLoading } = useGetClassList();
  const cols = TableHasActionCols();

  return (
    <Table dataSource={data} columns={cols} size="small" loading={isLoading} />
  );
};

export default TableHasAction;
