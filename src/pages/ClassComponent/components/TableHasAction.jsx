import { Table } from "antd";
import { useGetClassList } from "../hooks";
import { TableHasActionCols } from "./TableHasActionCols";

const TableHasAction = () => {
  const { data, isLoading } = useGetClassList();
  const cols = TableHasActionCols();

  return (
    <Table
      dataSource={data}
      columns={cols}
      size="small"
      loading={isLoading}
      bordered
    />
  );
};

export default TableHasAction;
