import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    // maintainAspectRatio: false,
    aspectRatio: 1,
    // responsive: true,
    plugins: {
        legend: {
            position: "none",
        },
        title: {
            display: true,
            text: "Gastos ao longo do mês",
            // change font color
            color: "black",
        },
        // change font color of axis
        scales: {
            x: {
                color: "black",
            },
            y: {
                color: "black",
            },
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [1, 2, 30, 4, 5, 6, 70],
            borderColor: "rgb(0, 0, 0)",
            backgroundColor: "rgb(0, 0, 0)",
        },
    ],
};

export default function Gafico() {
    return <Line options={options} data={data} height={null} width={null} />;
}
