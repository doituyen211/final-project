import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGetQuantityPerYear } from "../hooks";
import ChartHeader from "./ChartHeader";
import ChartLayout from "./ChartLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
);

export const GraduateStudentsPerYear = () => {
  const { labels, totalGraduateStudentPerYear, totalStudentPerYear } =
    useGetQuantityPerYear();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số học viên tốt nghiệp",
        data: totalGraduateStudentPerYear,
        borderColor: "#e8bbff",
        pointBackgroundColor: "#6fff00",
        pointBorderColor: "#e8bbff",
        borderWidth: 1,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgb(182, 247, 133,0.8)");
          gradient.addColorStop(1, "white");
          return gradient;
        },
        tension: 0.4,
      },
      {
        label: "Số học viên",
        data: totalStudentPerYear,
        borderColor: "#e8bbff",
        pointBackgroundColor: "#6fff00",
        pointBorderColor: "#e8bbff",
        borderWidth: 1,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgb(196,223,230,0.8)");
          gradient.addColorStop(1, "white");
          return gradient;
        },
        tension: 0.4,
      },
    ],
  };

  const options = {
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
      <ChartHeader>Số lượng học viên tốt nghiệp theo từng năm</ChartHeader>
      <Line data={data} options={options} />
    </ChartLayout>
  );
};
