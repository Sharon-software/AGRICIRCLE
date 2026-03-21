import {use, useContext} from 'react'
import {AuthContext} from './AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {isLoggedIn}=useContext(AuthContext)
    const location=useLocation();

  return isLoggedIn ? (
    children
  ):(
    <Navigate to ='/Login' state={{ from: location }} replace />
  )
}

export default PrivateRoute