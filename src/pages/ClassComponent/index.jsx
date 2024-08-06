import { useEffect, useState } from "react";
import PageContent from "./PageContent";
import PageHeader from "./PageHeader";
import PageLayout from "./PageLayout";
import axios from "axios";

const ClassComponent = () => {
  const [dataTable, setDataTable] = useState([]);
  const [classTable, setClassTable] = useState("");
  const apiUpdate = "https://66ac7831f009b9d5c73229a5.mockapi.io/classes";
  const apiCreate = "https://66ac7831f009b9d5c73229a5.mockapi.io/classes";
  const apiDelete = "https://66ac7831f009b9d5c73229a5.mockapi.io/classes";
  const apiView = "https://66ac7831f009b9d5c73229a5.mockapi.io/classes";

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://66ac7831f009b9d5c73229a5.mockapi.io/classes"
      ); // Get data from api
      setDataTable(res.data);
      setClassTable("table table-bordered table-hover");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formFieldsProp = [
    {
      name: "code",
      type: "text",
      label: "Mã chương trình đào tạo",
      placeholder: "Nhập mã chương trình đào tạo",
    },
    {
      name: "name",
      type: "text",
      label: "Tên lớp",
      placeholder: "Nhập tên lớp",
    },
    {
      name: "size",
      type: "text",
      label: "Sĩ số",
      placeholder: "Nhập sĩ số",
    },
    {
      name: "startDate",
      type: "text",
      label: "Ngày bắt đầu",
      placeholder: "Nhập ngày bắt đầu",
    },
    {
      name: "endDate",
      type: "text",
      label: "Ngày kết thúc",
      placeholder: "Nhập ngày kết thúc",
    },
  ];
  const cols = [
    "Mã lớp",
    "Mã chương trình đào tạo",
    "Tên lớp",
    "Sĩ số",
    "Ngày bắt đầu",
    "Ngày kết thúc",
    "",
  ];

  useEffect(() => {
    getData();
  }, [dataTable]);

  const handleSave = (formData) => {
    console.log("Saving data...");
    console.log("Form data:", formData);
    // Your save logic here
  };

  return (
    <PageLayout>
      <PageHeader namePage={"Quản lý lớp học"} />
      <PageContent
        headerContent={"Danh sách lớp học"}
        dataTable={dataTable}
        getData={getData}
        classTable={classTable}
        apiUpdate={apiUpdate}
        apiCreate={apiCreate}
        apiDelete={apiDelete}
        apiView={apiView}
        formFieldsProp={formFieldsProp}
        cols={cols}
        handleSave={handleSave}
      />
    </PageLayout>
  );
};

export default ClassComponent;
