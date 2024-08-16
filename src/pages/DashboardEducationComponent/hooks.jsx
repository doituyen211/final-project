import { useQuery } from "@tanstack/react-query";
import { dashboardEducationApi } from "../../services/dashboardEducationApi";

export const useGetGraduateClasses = () => {
  const { data } = useQuery({
    queryKey: ["graduate-classes"],
    queryFn: dashboardEducationApi.getGraduateClasses,
  });

  const labels = data?.data.map((item) => item.year);
  const totalGraduateClasses = data?.data.map(
    (item) => item.totalGraduateClasses
  );

  return { labels, totalGraduateClasses };
};

export const useGetReserveStudent = () => {
  const { data } = useQuery({
    queryKey: ["reserve-student"],
    queryFn: dashboardEducationApi.getReserveStudent,
  });

  const labels = data?.data.map((item) => item.year);
  const totalReserveStudent = data?.data.map(
    (item) => item.totalReserveStudent
  );

  return { labels, totalReserveStudent };
};
