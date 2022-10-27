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

export default function Gafico({ transactionsFiltradas }) {
    let acumulado = 0;
    const dias = [];
    const gastos = [];

    for (let i = 0; i < transactionsFiltradas; i++) {
        const transacao = transactionsFiltradas[i];
        dias.push(transacao.date.split("-")[2]);
        acumulado += parseFloat(transacao.amount);
        gastos.push(acumulado);
    }

    const labels = dias;

    const data = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: [...gastos],
                borderColor: "rgb(0, 0, 0)",
                backgroundColor: "rgb(0, 0, 0)",
            },
        ],
    };
    return <Line options={options} data={data} height={null} width={null} />;
}
