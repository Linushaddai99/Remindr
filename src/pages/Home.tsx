import React from 'react'
import SignUp from '../Auth/SignUp'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const {signOut} = UserAuth();

  function handleSignOut() {
    try{
      signOut();
      navigate('/signup')
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Home page</h1>
      <button onClick={handleSignOut} className='border p-2'>Sign out</button>  
    </div>
  )
}

export default Home
