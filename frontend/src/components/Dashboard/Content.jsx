import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Content = () => {
  return (
    <div className='content flex flex-col '>
        <Header/>
        <div  className=' mt-[70px]'>
            <Outlet/>
        </div>
        
    </div>
  )
}

export default Content;
