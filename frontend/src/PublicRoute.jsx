import {useContext} from 'react'
import {AuthContext} from './AuthProvider'
import { Navigate } from 'react-router'

const PublicRoute = ({children}) => {
const {isLoggedIn}=useContext(AuthContext)
  return  !isLoggedIn ? (
    children
  ) : (
    <Navigate to='/Dashboard' />
  )
}

export default PublicRoute