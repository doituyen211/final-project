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
import { useGetReserveStudent } from "../hooks";
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

export const ReserveStudentPerYearChart = () => {
  const { labels, totalReserveStudent } = useGetReserveStudent();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số học viên bảo lưu",
        data: totalReserveStudent,
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
        tension: 0.3,
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
        min: 0,
        max: 60,
      },
    },
  };

  return (
    <ChartLayout>
      <ChartHeader>Thống kê số lượng học viên bảo lưu theo năm</ChartHeader>
      <Line data={data} options={options} />
    </ChartLayout>
  );
};
