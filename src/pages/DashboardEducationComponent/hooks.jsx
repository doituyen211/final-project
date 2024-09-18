import { useQuery } from "@tanstack/react-query";
import { dashboardEducationApi } from "../../services/dashboardEducationApi";
import useDashBoardStore from "./store";

export const useGetQuantity = () => {
  const { data } = useQuery({
    queryKey: ["manage-quantity"],
    queryFn: dashboardEducationApi.getQuantity,
  });

  const totalStudentsAllYears = data?.data.reduce((total, yearData) => {
    return (
      total +
      yearData.data.reduce((yearTotal, cur) => yearTotal + cur.totalStudents, 0)
    );
  }, 0);

  const totalGraduateStudentsAllYears = data?.data.reduce((total, yearData) => {
    return (
      total +
      yearData.data.reduce(
        (yearTotal, cur) => yearTotal + cur.graduateStudents,
        0
      )
    );
  }, 0);

  const totalYears = data?.data.length;

  return {
    totalStudentsAllYears,
    totalGraduateStudentsAllYears,
    totalYears,
  };
};

export const useGetQuantityPerYear = () => {
  const year = useDashBoardStore((state) => state.year);
  const { data } = useQuery({
    queryKey: ["manage-quantity-per-year", year],
    queryFn: () => dashboardEducationApi.getQuantityPerYear(year),
  });

  const dataQuantityPerYear = data?.data.data;

  const labels = dataQuantityPerYear?.map((item) => item.month);

  const totalStudentPerYear = dataQuantityPerYear?.map(
    (item) => item.totalStudents
  );

  const totalGraduateStudentPerYear = dataQuantityPerYear?.map(
    (item) => item.graduateStudents
  );

  const totalReserveStudentPerYear = dataQuantityPerYear?.map(
    (item) => item.reserveStudents
  );

  return {
    labels,
    totalStudentPerYear,
    totalGraduateStudentPerYear,
    totalReserveStudentPerYear,
  };
};
