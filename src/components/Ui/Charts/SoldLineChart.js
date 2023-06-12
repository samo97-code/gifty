import React from 'react';
import {Line} from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import { CategoryScale, LinearScale, Chart } from "chart.js/auto";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(zoomPlugin);
// CategoryScale.register();


const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Sold Products',
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'x',
            }
        }
    },
};

const SoldLineChart = ({soldProducts}) => {
    const products = soldProducts.map((item)=>item).sort(
        (objA, objB) => Number(new Date(objA.sold_date)) - Number(new Date(objB.sold_date)),
    )

    const labels = products.map((item)=>item.sold_date)
    const soldData = products.map((item)=>item.gifty_price)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Sold Products',
                data: soldData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }


        return (
        <div>
            <Line options={options} data={data}/>
        </div>
    );
};

export default SoldLineChart;