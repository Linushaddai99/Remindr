import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='p-10'>
      <h1>Welcome to Remindr</h1>
      <Outlet />
    </div>
  )
}

export default Dashboard
