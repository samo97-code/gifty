import React, {useMemo} from 'react';
import {Bar} from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import {CategoryScale, LinearScale, Chart} from "chart.js/auto";
import moment from 'moment'

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(zoomPlugin);


const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Ordered & Sold Products Count',
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

const OrderSoldChart = ({products}) => {
    const labels = ['Jan', "Feb", 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const datesOrdered = products.reduce((acc, {order_date}) => {
        if (order_date) {
            const orderDate = labels[moment(order_date).month()]

            if (orderDate in acc) acc[orderDate].push(order_date);
            else acc[orderDate] = [order_date];
        }

        return acc;
    }, {});

    const datesSold = products.reduce((acc, {sold_date}) => {
        if (sold_date) {
            const soldDate = labels[moment(sold_date).month()]

            if (soldDate in acc) {
                if (sold_date) acc[soldDate].push(sold_date);
            } else acc[soldDate] = [sold_date];
        }

        return acc;
    }, {});


    const dataOrdered = useMemo(() => {
        const temp = []

        labels.map((label) => {
            if (datesOrdered[label]) {
                temp.push(datesOrdered[label].length)
            } else temp.push(0)
        })
        return temp

    }, [datesOrdered])

    const dataSold = useMemo(() => {
        const temp = []

        labels.map((label) => {
            if (datesSold[label]) {
                temp.push(datesSold[label].length)
            } else temp.push(0)
        })
        return temp

    }, [datesSold])


    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Orders Count',
                data: dataOrdered,
                backgroundColor: 'rgba(65,78,215,0.5)',
                borderColor: 'rgba(65,78,215,0.5)',
            },
            {
                label: 'Sold Count',
                data: dataSold,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }


    return (
        <div>
            <Bar options={options} data={data}/>
        </div>
    );
};

export default OrderSoldChart;