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
import { backgroundColor, borderColor } from "../constants";
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

const TotalStudentPerYear = () => {
  const [type, setType] = useState("basic");

  const checkTypeChart = type === "basic";

  const { labels, totalStudentPerYear } = useGetQuantityPerYear();

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
      <ChartHeader>Số lượng học viên theo từng năm</ChartHeader>
      <RadioComponent type={type} setType={setType} />
      <Bar data={data} options={options} />
    </ChartLayout>
  );
};

export default TotalStudentPerYear;
