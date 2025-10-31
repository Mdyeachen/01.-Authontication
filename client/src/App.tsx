import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom"

import Home from "./pages/home";
import AuthLaout from "./layout/auth";
import SignUp from "./pages/signup";
import Login from "./pages/login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, 
  {
    element: <AuthLaout />,
    children : [
      {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element : <Login />
    } 
]
  }
])

const App: React.FC = () => <RouterProvider router={router} />

export default App