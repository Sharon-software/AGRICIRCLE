import React, {useEffect} from 'react'
import axios from 'axios';
import axiosInstance from '../axiosinstance';

const Dashboard = () => {
    
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
    
    
    </>
  )
}

export default Dashboard