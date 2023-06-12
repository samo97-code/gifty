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
            text: 'Ads Prices & Counts',
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

const AdsBarChart = ({ads}) => {
    const labels = ['Jan', "Feb",'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

    const priceAds = ads.reduce((acc, { created_at, price_arm }) => {
        const orderDate = labels[moment(created_at).month()]

        if (orderDate in acc) {
            acc[orderDate] += price_arm;
        } else {
            acc[orderDate] = price_arm;
        }

        return acc;
    }, {});

    const priceCountAds = ads.reduce((acc, { created_at }) => {
        const orderDate = labels[moment(created_at).month()]

        if (orderDate in acc) {
            if (created_at)  acc[orderDate].push(created_at);
        } else acc[orderDate] = [created_at];

        return acc;
    }, {});

    const priceDataAds = useMemo(()=>{
        const temp = []

        labels.map((label)=>{
            if (priceAds[label]){
                temp.push(priceAds[label].toFixed(0))
            }else temp.push(0)
        })
        return temp

    },[priceAds])

    const countDataAds = useMemo(()=>{
        const temp = []

        labels.map((label)=>{
            if (priceCountAds[label]){
                temp.push(priceCountAds[label].length)
            }else temp.push(0)
        })
        return temp

    },[priceCountAds])

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Ads Money(դր)',
                data: priceDataAds,
                backgroundColor: 'rgba(65,78,215,0.5)',
                borderColor: 'rgba(65,78,215,0.5)',
            },
            {
                label: 'Ads Count',
                data: countDataAds,
                backgroundColor: 'rgba(52,171,58,0.5)',
                borderColor: 'rgba(52,171,58,0.5)',
            },
        ],
    }

    return (
        <div>
            <Bar options={options} data={data}/>
        </div>
    );
};

export default AdsBarChart;