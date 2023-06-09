import React, {useMemo} from 'react';
import {Bar} from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import { CategoryScale, LinearScale, Chart } from "chart.js/auto";
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
            text: 'Money',
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

const PriceBarChart = ({products, year}) => {
    const labels = ['Jan', "Feb",'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

    const priceOrdered = products.reduce((acc, { order_date, shop_price_arm }) => {
        if (order_date){
            const orderDate = labels[moment(order_date).month()]
            const orderYearDate = moment(order_date).year()

            if (orderYearDate === +year){
                if (orderDate in acc) {
                    acc[orderDate] += shop_price_arm;
                } else {
                    acc[orderDate] = shop_price_arm;
                }
            }

        }

        return acc;
    }, {});

    const priceSold = products.reduce((acc, { order_date, sold_date, gifty_price }) => {
        if(sold_date){
            const soldDate = labels[moment(sold_date).month()]
            const orderYearDate = moment(order_date).year()

            if (orderYearDate === +year){
                if (soldDate in acc) {
                    acc[soldDate] += +gifty_price;
                } else {
                    acc[soldDate] = +gifty_price;
                }
            }
        }

        return acc;
    }, {});

    const onexPriceOrdered = products.reduce((acc, { order_date, arrived_date, shipment_price }) => {
        const orderDate = labels[moment(arrived_date).month()]
        const orderYearDate = moment(order_date).year()

        if (orderYearDate === +year){
            if (orderDate in acc) {
                acc[orderDate] += +shipment_price;
            } else {
                acc[orderDate] = +shipment_price;
            }
        }

        return acc;
    }, {});

    const cleanIncomePriceOrdered = products.reduce((acc, { order_date, sold_date, clean_income }) => {
        if (sold_date){
            const soldDate = labels[moment(sold_date).month()]
            const orderYearDate = moment(order_date).year()

            if (orderYearDate === +year){
                if (soldDate in acc) {
                    acc[soldDate] += +clean_income;
                } else {
                    acc[soldDate] = +clean_income;
                }
            }
        }

        return acc;

    }, {});


    const priceDataOrdered = useMemo(()=>{
        const temp = []

        labels.map((label)=>{
            if (priceOrdered[label]){
                temp.push(priceOrdered[label].toFixed(0))
            }else temp.push(0)
        })
        return temp

    },[priceOrdered])

    const priceDataSold = useMemo(()=>{
        const temp = []

        labels.map((label)=>{
            if (priceSold[label]){
                temp.push(priceSold[label].toFixed(0))
            }else temp.push(0)
        })
        return temp

    },[priceSold])

    const onexPriceDataOrdered = useMemo(()=>{
        const temp = []

        labels.map((label)=>{
            if (onexPriceOrdered[label]){
                temp.push(onexPriceOrdered[label].toFixed(0))
            }else temp.push(0)
        })
        return temp

    },[onexPriceOrdered])

    const cleanIncomeData = useMemo(()=>{
        const temp = []

        labels.map((label)=>{
            if (cleanIncomePriceOrdered[label]){
                temp.push(cleanIncomePriceOrdered[label].toFixed(0))
            }else temp.push(0)
        })
        return temp

    },[cleanIncomePriceOrdered])


    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Orders Money(դր)',
                data: priceDataOrdered,
                backgroundColor: 'rgba(65,78,215,0.5)',
                borderColor: 'rgba(65,78,215,0.5)',
            },
            {
                label: 'Onex Money(դր)',
                data: onexPriceDataOrdered,
                backgroundColor: 'rgba(52,171,58,0.5)',
                borderColor: 'rgba(52,171,58,0.5)',
            },
            {
                label: 'Sold Money(դր)',
                data: priceDataSold,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Clean Income(դր)',
                data: cleanIncomeData,
                backgroundColor: 'rgba(229,148,47,0.98)',
                borderColor: 'rgba(229,148,47,0.98)',
            },

        ],
    }

    return (
        <div>
            <Bar options={options} data={data}/>
        </div>
    );
};

export default PriceBarChart;