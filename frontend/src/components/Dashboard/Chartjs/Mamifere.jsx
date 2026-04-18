import React from 'react';
import { Doughnut, Line, Pie } from 'react-chartjs-2';


const data = {
    labels: false,
    datasets: [{
      label: 'Ventes annuelles',
      data: [300, 400, 200],
      backgroundColor: ['#605DFF', '#e63f3f', '#ffe713'],
      hoverBackgroundColor: ['#605DFF', '#e63f3f', '#ffe713'],
      
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

const Mamifere = () => {
  return (
    <div>
        <Doughnut data={data} options={options} className='' />
    </div>
  )
}

export default Mamifere
