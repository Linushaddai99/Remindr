import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import routes from './routes/index'

const App = () => {

    const router = createBrowserRouter([
    {
      element: <Dashboard />,
      children: routes
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App

