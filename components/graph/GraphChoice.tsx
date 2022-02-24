import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    RadialLinearScale,
    Filler,
  } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Radar } from "react-chartjs-2";

ChartJS.register(
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    Filler,
  )

type BubbleProps ={
    //Determine which of the charts will be used
    form: "Bar" | "Line" | "Radar"
    //General information about the chart
    title:string
    labels: string[]
    //dataset 1 information
    dataset1label:string
    dataset1data: number[]
    //dataset 2 information
    dataset2label?:string
    dataset2data?: number[]
    //dataset 3 information
    dataset3label?:string
    dataset3data?: number[]
}

export const GraphChoice = (props:BubbleProps) =>{
    //set chart options
    var options = {
        responsive: true,
        color:'black',
        scales: {
   
        },
        chartArea:{
            backgroundColor:'white'
        },
        plugins: {
            legend: {
            position: 'top' as const,
            },
            
        },
    };

    //make labels accessible to inner functions
    const labels = props.labels

    //initialize datasets
    let sets =[];

    //initialize the properties of dataset 1
    if(typeof props.dataset1data != 'undefined' && typeof props.dataset1label != 'undefined' ){
        sets.push({
            label:props.dataset1label,
            data:props.dataset1data,
            fill:true,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor:'rgb(255,0,0)',
            pointBorderColor:'#fff'
        });
    }


    //initialize the properites of dataset 2
    if(typeof props.dataset2data != 'undefined' && typeof props.dataset2label != 'undefined' ){
        sets.push({
            label:props.dataset2label,
            data:props.dataset2data,
            borderColor: 'rgba(99, 255, 132,1)',
            backgroundColor: 'rgba(132, 255, 99, 0.7)',
            pointBackgroundColor:'rgb(0,255,0)',
            pointBorderColor:'#fff'
        });
    }

    //initialize the properties of dataset 3
    if(typeof props.dataset3data != 'undefined' && typeof props.dataset3label != 'undefined' ){
        sets.push({
            label:props.dataset3label,
            data:props.dataset3data,
            borderColor: 'rgb(132, 99, 255)',
            backgroundColor: 'rgba(132, 99, 255, 0.7)',
            pointBackgroundColor:'rgb(0,0,255)',
            pointBorderColor:'#fff'
        });
    }

    //join togehter the data properties
    const data = {
        labels,
        datasets: sets
    }

    //Use the choice of graph in order to determine which chart component to return to the parent component
    switch (props.form){
        case "Bar":{
            return <Bar options={options} data={data} />
        }
        case "Line":{
            return <Line options={options} data={data} />
        }
        case "Radar":{
            options.scales ={
                r:{
                    beginAtZero:true,
                    angleLines:{display:false},
                    pointLabels:{color:'black'},

                    ticks:{color:'black',backdropColor:'white',display:false},
                    
                }
            };
            //options.chartArea={backgroundColor:'white'}
            return <Radar options={options} data={data} />
        }
        default:{
            return <Bar options={options} data={data} />
        }

    }
}