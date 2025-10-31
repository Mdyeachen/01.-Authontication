import React from 'react'
import { Outlet } from "react-router-dom"

const AuthLaout: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Outlet />
    </div>
  )
}

export default AuthLaout