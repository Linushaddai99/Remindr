import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'
import { AuthContextProvider } from './context/AuthContext'


const App = () => (
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)

export default App
