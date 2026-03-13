import {useContext} from 'react'
import {AuthContext} from './AuthProvider'
import { Navigate } from 'react-router'

const PrivateRoute = ({children}) => {
    const {isLoggedIn}=useContext(AuthContext)
  return isLoggedIn ? (
    children
  ):(
    <Navigate to ='/Login'/>
  )
}

export default PrivateRoute