import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import {supabase} from '../../supabase-client'
import unboard from '../assets/unboard6.jpg'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'

type SigninProp = {
  setSwiitch: React.Dispatch<React.SetStateAction<boolean>>
}

const SignIn: React.FC<SigninProp> = ({setSwiitch}) => {
  const navigate = useNavigate()
    const initialState = {
        email: '',
        password: ''
    };

    const [state, setState] = useState(initialState);
     const [err, setErr] = useState('')

    const { session, signIn } = UserAuth();


    const handleSignIn = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        const result = await signIn(state.email, state.password);
        if (result?.success) {
          navigate('/');
        } else if (result?.error) {
          setErr(result.error.message || 'Sign in failed');
        }
      } catch (error) {
        setErr(error instanceof Error ? error.message : String(error));
        console.log(error);
      }
    }

    const handleGoogleSignUp = async () => {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
    }


  return (

       <form onSubmit={handleSignIn}  className='py-5 w-[90%] max-w-[500px] mx-auto'>
          <h1 className=' font-extrabold text-blue-500 text-2xl '>Remindr</h1>
          <h1 className='font-bold text-gray-700 text-3xl md:text-4xl my-5'>Sign in</h1>
          <div className='flex gap-6 justify-center'>
            <button type='submit' onClick={handleGoogleSignUp} className='text-gray-600 w-full text-sm md:text-xl font-semibold p-2 flex justify-center items-center gap-3 border rounded cursor-pointer'>
              <svg width="18px" height="18px" viewBox="-3 0 262 262" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451" fill="#4285F4"> </path> <path d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1" fill="#34A853"> </path> <path d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37" fill="#FBBC05"> </path> <path d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479" fill="#EB4335"> </path> </g> </g></svg>
              <p>Google</p>
            </button>
            <button type='submit' onClick={handleGoogleSignUp} className='text-gray-600 w-full text-sm md:text-xl font-semibold p-2 flex justify-center items-center gap-3 border rounded cursor-pointer'>
              <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#1877F2" d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"></path><path fill="#ffffff" d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"></path></g></svg>          
              <p>Facebook</p>
            </button>
          </div>
    
          <div className="flex items-center justify-center my-10">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-sm text-gray-500">or continue with email</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className='text-center text-red-500 mb-5 text-lg'>
            <p>{err}!</p>
          </div>
    
          <div className='mb-10'>
    
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex  items-center text-gray-400">
                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6H20V18H4V6ZM6.56066 7.5L12 12.9393L17.4393 7.5H6.56066ZM18.5 8.56066L12 15.0607L5.5 8.56066V16.5H18.5V8.56066Z" fill="#787b7d"></path> </g></svg>
              </span>
              <input
                required
                onChange={(e) => {setState({...state, email: e.target.value})}}
                type="email"
                placeholder="Email"
                className="pl-10 pr-4 md:py-3 py-2  border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div className="relative my-5">
              <span className="absolute inset-y-0 left-0 pl-3 flex  items-center text-gray-400">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="#787b7d"
                  strokeWidth="3.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M24,25.28a3.26,3.26,0,0,0-1.64,6.07V36h3.32V31.35a3.28,3.28,0,0,0,1.61-2.8v0A3.27,3.27,0,0,0,24,25.28Z" />
                  <rect x="7.38" y="17.77" width="33.23" height="25.73" rx="4.32" />
                  <path d="M13.35,17.77V15.16a10.66,10.66,0,0,1,21.32,0v2.61" />
                </svg>
              </span>
              <input
                required
                onChange={(e) => {setState({...state, password: e.target.value})}}
                type="password"
                placeholder="Password"
                className="pl-10 pr-4 md:py-3 py-2  border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
    
           <button type='submit' className='text-[#f2f2f2] w-full md:p-3 p-2 mb-5 rounded bg-blue-500 cursor-pointer'>Sign in</button>
    
           <p className='font-medium text-center text-gray-500'>
              Don't have an account? <button onClick={() => { setSwiitch(false) }} className='text-blue-500 cursor-pointer font-medium'>Sign up!</button>
          </p>
        </form>
  )
}

export default SignIn
