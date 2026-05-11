import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function CategoryChart({ chartData }) {
  const data = {
    labels: chartData.map((item) => item.category),

    datasets: [
      {
        label: "Products Count",

        data: chartData.map((item) => item.count),
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Products Per Category",
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "40px",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default CategoryChart;
