import React from 'react'
import {  Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const token = localStorage.getItem("token");
    if(!token){
        return <Navigate to="http://localhost:5173/login" replace/>
    }
  return children; 
  
}

export default ProtectedRoute;