import React from 'react'
import { Line } from 'react-chartjs-2'



function LineChartMobile({dates,datesData}) {


    const data={
        labels: dates,
        datasets: [
            {
                label: 'People Visits for 2020 (M)',
                data: datesData,
                borderColor: ['rgb(214, 28, 28)'],
                backgroundColor: ['rgba(214, 28, 28,0.2)'],
                pointBackgroundColor: ['rgb(214, 28, 28,0.2)'],
                pointBorderColor: ['rgb(214, 28, 28)']
            }
        ]
    }
    return (<Line data={data} width={100}
        height={150}
        options={{ maintainAspectRatio: false }} />);

      
}

export default LineChartMobile
