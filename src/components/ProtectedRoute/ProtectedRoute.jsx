import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export default function ProtectedRoute({ children }) {
  const { userToken } = useContext(UserContext)

  // لو مش logged in → روح لصفحة الـ Login
  if (!userToken) {
    return <Navigate to="/login" replace />
  }

  // لو logged in → عرض الصفحة
  return children
}
