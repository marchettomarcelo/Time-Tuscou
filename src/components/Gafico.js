import React, { useEffect } from "react";
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

const options = {
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

const labels = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export default function Gafico({ transactionsFiltradas }) {
    const [data, setData] = React.useState({
        labels: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
        datasets: [
            {
                label: "Dataset 1",
                data: [1, 2, 30, 4, 5, 6, 70],
                borderColor: "rgb(0, 0, 0)",
                backgroundColor: "rgb(0, 0, 0)",
            },
        ],
    });

    useEffect(() => {
        let novo = { ...data };

        let novoy = [];
        let novox = [];
        let acumulado = 0;

        for (let i = 0; i < transactionsFiltradas.length; i++) {
            acumulado += parseFloat(transactionsFiltradas[i].amount);

            novoy.push(acumulado);
            novox.push(transactionsFiltradas[i].date.split("-")[2]);
        }

        novo.datasets[0].data = novoy;
        novo.labels = novox;

        setData(novo);
    }, [transactionsFiltradas]);

    return (
        <Line
            options={options}
            data={data}
            height={null}
            width={null}
            // redraw={true}
            key={Math.random()}
        />
    );
}
