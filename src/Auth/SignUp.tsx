import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const initialState = {
        username: '',
        email: '',
        password: ''
    };

    const [state, setState] = useState(initialState);
    
  return (
    <div className='w-[30%] mx-auto'>
      <form className=' m-auto mt-24'>
        <h2>Sign up today!</h2>
        <p>
            Already have an account? <Link to='/signin'><span className='text-purple-500 font-medium'>Sign in!</span></Link>
        </p>
        <div className='flex flex-col py-4'>
            <input className='my-4 border p-2 rounded  border-[#d2d2d2] ' type="text" placeholder='Username' />
            <input className='my-4 border p-2 rounded  border-[#d2d2d2] ' type="email" placeholder='Email' />
            <input className='my-4 border p-2 rounded  border-[#d2d2d2] mb-10' type="password" placeholder='Password' />

            <button type='submit' className='text-[#f2f2f2] p-2 rounded bg-purple-500 cursor-pointer'>Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
