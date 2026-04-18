import React, { useEffect, useState } from 'react'
import EmpNotif from './EmpModal/EmpNotif';
import EmpRight from './EmpModal/EmpRight';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { token } from '../Dashboard/Header';

export default function EmpHeader() {

  const [nom, setNom] = useState();

  useEffect(()=>{
    fetchEmploye();
  }, [])

  const fetchEmploye = async () => {
    try {
      const token = localStorage.getItem('token');
      if(token){
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        const result = await axios.get(`http://192.168.0.13:8080/employes/get/${userId}`,
          {
            headers: {
              'Authorization': `${token}`
            }
          }
        );
        setNom(result.data[0].nom);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des informations utilisateur:", error)
    }
  }

  return (
    <div>
      <div >
        <div className='head px-10 '>
            <h2 className='farm-name text-[12px] md:text-[20px] '>Restaurant Fianara</h2>
            <div className=' flex gap-1'>
                <h2 className='flex items-center' >{nom}</h2>
                <div className='flex items-center'>
                    <EmpNotif/>
                </div>

                <EmpRight/>
               
            </div>
            
        </div>
      </div>
    </div>
  )
}
