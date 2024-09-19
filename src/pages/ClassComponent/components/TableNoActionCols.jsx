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
            <div style={{ color: "lightgreen" }}>Đang học</div>
          ) : (
            <div className="text-gray">Đã thôi học</div>
          )}
        </>
      ),
    },
  ];
};
