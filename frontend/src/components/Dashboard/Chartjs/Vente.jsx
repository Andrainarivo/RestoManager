import React from 'react';
import { Line} from 'react-chartjs-2';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card";



const data = {
  labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
  datasets: [{
    label: 'Animaux',
    data: [100, 200, 300, 500, 450, 400],
    fill: false,
    backgroundColor: '#605DFF',
    borderColor: '#605DFF',
  },
  {
    label: 'Ouefs',
    data: [200, 250, 400, 200, 300, 500],
    fill: false,
    backgroundColor: '#62ce6b',
    borderColor: '#62ce6b',
  },
  {
    label: 'Lait',
    data: [300, 150, 200, 250, 500, 600],
    fill: false,
    backgroundColor: '#ffe713',
    borderColor: '#ffe713',
  }

]
};

const options = {
  title: {
    display: true,
    text: 'Exemple de Line Chart',
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
    }],
  },
};

const Vente = () => {
  return (
    <div className=' w-full flex  flex-col gap-5'>
        <div className="flex flex-wrap justify-between">
            <h2 className='text-neutral-700 text-xl font-medium  flex items-end'> Courbe de vente</h2>
            <div className=" bg-white px-5 rounded-sm">
                <h2 className='font-medium' >Filtrer en 2 dates:</h2>
                <div className="flex gap-10">
                    <p><span className=' font-medium'>Début:</span> 11/05/24</p>
                    <p><span className=' font-medium'>Fin:</span> 11/05/24</p>
                </div>
            </div>
        </div>
        <div className=' flex items-center justify-center bg-white h-[430px] rounded-sm'>
            <Line data={data} options={options} />
        </div>
        
    </div>
  )
}

export default Vente
