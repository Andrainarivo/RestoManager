import React from 'react'
import EmpNavigation from './EmpNavigation'
import EmpContent from './EmpContent'

export default function EmpDashboard() {
  return (
    <div className='dash'>
        <EmpNavigation/>
        <EmpContent/>
    </div>
  )
}
