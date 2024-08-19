import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { backgroundColor, backgroundColor1, borderColor } from "../constants";
import { useGetQuantityPerYear } from "../hooks";
import ChartHeader from "./ChartHeader";
import ChartLayout from "./ChartLayout";
import RadioComponent from "./RadioComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReserveStudentsPerYear = () => {
  const { labels, totalReserveStudentPerYear, totalStudentPerYear } =
    useGetQuantityPerYear();

  const [type, setType] = useState("basic");

  const checkTypeChart = type === "basic";

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số học viên",
        data: totalStudentPerYear,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
      {
        label: "Số học viên bảo lưu",
        data: totalReserveStudentPerYear,
        backgroundColor: backgroundColor1,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: checkTypeChart ? "x" : "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ChartLayout>
      <ChartHeader>Số lượng học viên bảo lưu theo từng năm</ChartHeader>
      <RadioComponent type={type} setType={setType} />
      <Bar data={data} options={options} />
    </ChartLayout>
  );
};

export default ReserveStudentsPerYear;
