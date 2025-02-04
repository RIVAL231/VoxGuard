import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const GraphComponent = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Total Calls",
        data: [12000, 15000, 14000, 20000, 25000, 23000, 27000],
        borderColor: "black",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Forged Calls",
        data: [5000, 7000, 6500, 10000, 12000, 11000, 14000],
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        borderDash: [5, 5], // Makes it a dashed line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} />;
};

export default GraphComponent;
