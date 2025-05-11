import { createBrowserRouter } from "react-router-dom";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import Home from "../pages/Home";

const routes = [
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
    {
    path: "/",
    element: <Home />,
  },
];

export default routes;
