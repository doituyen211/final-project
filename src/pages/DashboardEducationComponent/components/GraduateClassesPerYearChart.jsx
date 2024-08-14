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
import ChartHeader from "./ChartHeader";
import ChartLayout from "./ChartLayout";
import ToolComponent from "./ToolComponent";
import { backgroundColor, borderColor } from "../constants";
import { useGetGraduateClasses } from "../hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraduateClassesPerYearChart = () => {
  const { labels, totalGraduateClasses } = useGetGraduateClasses();
  const [value, setValue] = useState("basic");

  const checkTypeChart = value === "basic";

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số lớp tốt nghiệp",
        data: totalGraduateClasses,
        backgroundColor: backgroundColor,
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
      <ChartHeader>Thống kê số lượng lớp tốt nghiệp theo năm</ChartHeader>
      <ToolComponent value={value} setValue={setValue} />
      <Bar data={data} options={options} />
    </ChartLayout>
  );
};

export default GraduateClassesPerYearChart;
