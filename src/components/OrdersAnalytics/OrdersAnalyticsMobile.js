import React from 'react'
import { Line } from 'react-chartjs-2'



function OrdersAnalytics({dates,datesData}) {


    const data={
        labels: dates,
        datasets: [
            {
                label: 'Sales for 2020 (M)',
                data: datesData,
                borderColor: ['rgb(34, 240, 71)'],
                backgroundColor: ['rgba(34, 240, 71,0.2)'],
                pointBackgroundColor: ['rgba(34, 240, 71,0.2)'],
                pointBorderColor: ['rgb(34, 240, 71)']
            }
        ]
    }
    return (<Line data={data} 
        width={100}
        height={150}
        options={{ maintainAspectRatio: false }}
    />);

      
}

export default OrdersAnalytics
