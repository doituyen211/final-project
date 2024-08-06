import { useQuery } from "@tanstack/react-query";
import { classApi } from "../../services/classApi";
import PageContent from "./layouts/PageContent";
import PageHeader from "./layouts/PageHeader";
import PageLayout from "./layouts/PageLayout";
import { useState } from "react";
import { columns } from "./constants";

const ClassComponent = () => {
  const { data } = useQuery({
    queryKey: ["class-list"],
    queryFn: classApi.getClassList,
  });

  return (
    <PageLayout>
      <PageHeader namePage={"Quản lý lớp học"} />
      <PageContent
        headerContent={"Danh sách lớp học"}
        dataTable={data?.data.content}
        columns={columns}
      />
    </PageLayout>
  );
};

export default ClassComponent;
