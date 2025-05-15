import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate()
    const initialState = {
        username: '',
        email: '',
        password: ''
    };

    const [state, setState] = useState(initialState);

    const { session, signupNewUser } = UserAuth();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        const result = await signupNewUser(state.email, state.password, state.username);
        console.log(result)
        if(result?.success) {
          navigate('/')
        }
      } catch(error) {
        console.log(error)
      }
    }

  return (
    <div className='w-[30%] mx-auto'>
      <form onSubmit={handleSignUp} className=' m-auto mt-24'>
        <h2>Sign up today!</h2>
        <p>
            Already have an account? <Link to='/signin'><span className='text-purple-500 font-medium'>Sign in!</span></Link>
        </p>
        <div className='flex flex-col py-4'>
            <input className='my-4 border p-2 rounded  border-[#d2d2d2]' onChange={(e) => {setState({...state, username: e.target.value})}} type="text" placeholder='Username' />
            <input className='my-4 border p-2 rounded  border-[#d2d2d2]' onChange={(e) => {setState({...state, email: e.target.value})}} value={state.email} type="email" placeholder='Email' />
            <input className='my-4 border p-2 rounded  border-[#d2d2d2] mb-10' onChange={(e) => {setState({...state, password: e.target.value})}} value={state.password} type="password" placeholder='Password' />

            <button type='submit' className='text-[#f2f2f2] p-2 rounded bg-purple-500 cursor-pointer'>Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
