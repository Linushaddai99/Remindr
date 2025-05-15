import React,{useEffect, useState} from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import SignUp from '../Auth/SignUp';
import SignIn from '../Auth/SignIn'


const Dashboard = () => {
  const { session, signupNewUser } = UserAuth();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Wait for Supabase to finish checking session
    const timer = setTimeout(() => setCheckingSession(false), 500); // Adjust if needed
    return () => clearTimeout(timer);
  }, []);

  if (checkingSession) {
    return <p>Loading...</p>; // or a spinner
  }

  if (!session) {
    return <Navigate to="/signup" />;
  }
  
  return (
    <div className='p-10'>
      <h1>Welcome to Remindr</h1>
      <Outlet />
    </div>
  )
}

export default Dashboard
