import {useEffect,useContext} from 'react'
import axios from 'axios';
import axiosInstance from '../axiosinstance';
import {AuthContext} from '../AuthProvider'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const {isLoggedIn,setIsLoggedIn}= useContext(AuthContext)
    const navigate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        navigate('/Login')
    }
    useEffect(() => {
    const fetchProtectedData = async () => {
        
        try {
            const response = await axiosInstance.get('/protected-view')
                
            
             console.log('Protected data:', response.data);     
        } catch (error) {
        console.error('Error fetching protected data:', error);
        }
    }
    fetchProtectedData();
}, [])

  return (
    <>
    
    {isLoggedIn ? (
      
      <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
    ):(
      <>

      </>
    )
    }
    
    </>
  )
}

export default Dashboard