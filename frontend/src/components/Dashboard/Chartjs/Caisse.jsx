import React from 'react';
import { Doughnut, Line, Pie } from 'react-chartjs-2';


const data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [{
      label: 'Entrant',
      data: [100, 200, 300, 450, 400, 600],
      fill: true, // Enable area fill for rounded curves
      backgroundColor: 'transparent', // Semi-transparent red
      borderColor: '#3b9633',
      tension: 0.4, // Adjust tension for curve smoothness (0-1)
    },
    {
        label: 'Sortant',
        data: [50, 150, 100, 500, 200, 550],
        fill: true, // Enable area fill for rounded curves
        backgroundColor: 'transparent', // Semi-transparent red
        borderColor: '#e63f3f',
        tension: 0.4, // Adjust tension for curve smoothness (0-1)
    },
    {
        label: 'Restart',
        data: [600, 200, 400, 100, 400, 100],
        fill: true, // Enable area fill for rounded curves
        backgroundColor: 'transparent', // Semi-transparent red
        borderColor: '#605DFF',
        tension: 0.4, // Adjust tension for curve smoothness (0-1)
    }
    ],
  };
  
  const options = {
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
    title: {
      display: true,
      text: 'Exemple de Line Chart (Courbe)',
    },
    elements: {
      line: {
        // Customize line styling
        borderWidth: 2,
      },
    },
  };

const Caisse = () => {
  return (
    
        <Line data={data} options={options} />
   
  )
}

export default Caisse
