import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../../services/reservationApi";
import PageContent from "./layouts/PageContent";
import PageHeader from "./layouts/PageHeader";
import PageLayout from "./layouts/PageLayout";
import { useState } from "react";
import { columns } from "./constants";

const ReservationComponent = () => {
  const { data } = useQuery({
    queryKey: ["reser-list"],
    queryFn: reservationApi.getReservationList,
  });

  return (
    <PageLayout>
      <PageHeader namePage={"Quản lý bảo lưu"} />
      <PageContent
        headerContent={"Danh sách bảo lưu"}
        dataTable={data?.data}
        columns={columns}
      />
    </PageLayout>
  );
};

export default ReservationComponent;
