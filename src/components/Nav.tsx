import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '@/context/AuthContext'
import { Button } from './ui/button'
import { div, style } from 'framer-motion/client'

const Nav = () => {
      const navigate = useNavigate()
  const {signOut} = UserAuth();

  function handleSignOut() {
    try{
      signOut();
      navigate('/unboard')
    } catch(error) {
      console.error(error)
    }
  }

  const style = {
    boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px'
  }

  return (
    <div className='fixed w-full py-5 px-10' style={style}>
        <div className='flex justify-between items-center '>
        <div>
            <h1 className='font-extrabold text-blue-500 text-4xl'>Remindr</h1>
        </div>
        <ul className='flex items-center gap-10'>
            <li><a href="">Home</a></li>
            <li><a href="">Contact</a></li>
            <li><a href="">Profile</a></li>
            <Button onClick={handleSignOut} variant="outline">Logout</Button>
        </ul>
        </div>
    </div>
  )
}

export default Nav
