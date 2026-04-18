import React from 'react';
import { Doughnut, Line, Pie } from 'react-chartjs-2';


const data = {
    labels: false,
    datasets: [{
      label: 'Ventes annuelles',
      data: [300, 700, 200],
      backgroundColor: ['#62ce6b', '#1d2041', '#5f6697'],
      hoverBackgroundColor: ['#62ce6b', '#1d2041', '#5f6697'],
    }],
    
  };
  
  const options = {
    title: {
      display: true,
      text: 'Répartition des ventes annuelles',
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        fontColor: 'black',
      },
    },
  };

const Volaille = () => {
  return (
    <div>
        <Doughnut data={data} options={options} className='' />
    </div>
  )
}

export default Volaille
