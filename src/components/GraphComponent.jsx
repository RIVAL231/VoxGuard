import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const GraphComponent = ({forgeryScansData,forgeryDetectionsData}) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [
      {
        label: "Total Calls",
        data: forgeryScansData,
        borderColor: "black",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Forged Calls",
        data: forgeryDetectionsData,
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
