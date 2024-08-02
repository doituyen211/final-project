import { useEffect, useState } from "react";
import PageContent from "./PageContent";
import PageHeader from "./PageHeader";
import PageLayout from "./PageLayout";

const ClassComponent = () => {
  const [cols, setCols] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const getData = () => {
    setCols([
      "Mã lớp",
      "Mã chương trình đào tạo",
      "Tên lớp",
      "Sĩ số",
      "Ngày bắt đầu",
      "Ngày kết thúc",
      "Hành động",
    ]);
    setDataTable([
      {
        id: "abc",
        trainingProgramId: "def",
        name: "ghk",
        size: "99",
        startDate: "1/7/2024",
        endDate: "1/10/2024",
        action: <>haha</>,
      },
    ]);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <PageLayout>
      <PageHeader namePage={"Quản lý lớp học"} />
      <PageContent
        headerContent={"Danh sách lớp học"}
        dataTable={dataTable}
        cols={cols}
      />
    </PageLayout>
  );
};

export default ClassComponent;
