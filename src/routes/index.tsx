import { createBrowserRouter, Navigate } from "react-router-dom";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import Home from "../pages/Home";
import Dashboard from './Dashboard'


const router = createBrowserRouter([
  // Public routes
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },

  // Redirect root to dashboard
  { path: "/", element: <Navigate to="/dashboard" /> },

  // Protected routes under Dashboard
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      // More nested routes...
    ]
  },
])


export default router;
