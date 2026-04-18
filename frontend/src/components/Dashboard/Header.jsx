import React, { useEffect, useState } from 'react';
import Notif from './Modal/Notif';
import Right from './Modal/Right';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export function token (){
  const token = localStorage.getItem('token');
 return  token;

}



const Header = () => {

  const [nom, setNom] = useState('');

  useEffect(()=>{
    fetchClient();
  }, [])

    const fetchClient = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.id;
          const result = await axios.get(`http://192.168.0.250:8080/clients/${userId}`);
          setNom(result.data[0].nom);
          
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
      
    }

  return (
    <div >
        <div className='head px-10 '>
            <h2 className='farm-name text-[12px] md:text-[20px] '>Restaurant Fianara</h2>
            <div className=' flex gap-1'>
                <h2 className='flex items-center' >{nom}</h2>
                <div className='flex items-center'>
                    <Notif/>
                </div>

                <Right/>
               
            </div>
            
        </div>
    </div>
  )
}

export default Header;