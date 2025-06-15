import React, { useState } from 'react'
import unboard from '../assets/unboard6.jpg'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, easeInOut, MotionConfig } from 'framer-motion'
import { div } from 'framer-motion/client'
import SignUp from './SignUp'
import SignIn from './SignIn'


const Unboard = () => {
    const [swiitch, setSwiitch] = useState(false)
   return (
    <div className='flex'>
        <div className='relative w-full h-dvh hidden md:block'>
            <h1 className='absolute left-10 top-10 font-extrabold text-white text-4xl'>Remindr</h1>
            {/* <h1 className='absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-4xl text-red-500'>Remember to reachout</h1> */}
            <img className='w-full h-full' src={unboard} alt="" />
        </div>
        <div className='w-full'>
            {swiitch ? <SignIn setSwiitch={setSwiitch}   /> : <SignUp setSwiitch={setSwiitch}   />}
        </div>
    </div>
  )
}

export default Unboard
