import React from 'react'
import EmpHeader from './EmpHeader'
import { Outlet } from 'react-router-dom'

export default function EmpContent() {
  return (
    <div className='content flex flex-col '>
        <EmpHeader/>
        <div  className=' mt-[70px]'>
            <Outlet/>
        </div>
        <p className=" relative top-[33vh] text-center text-black/50 text-sm ">&#169; Ragga & Rafane. 2024</p>
    </div>
  )
}
