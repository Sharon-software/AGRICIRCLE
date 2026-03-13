import React, {useState} from 'react'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errors,setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState(false)
    const [loading, setLoading] = useState(false)   
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const userData={
            email,
            password,
            first_name: firstName,
            last_name: lastName
        }
        
        try { 
           const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
            console.log('response.data==>',response.data)
            console.log('Registration successful');
            setErrors({}) // Clearsprevious errors on successful registration
            setSuccessMessage(true)
            navigate('/Login')
            //redirect to login page after successful registration
            
        }catch(error){
            setErrors(error.response.data)
           console.error('Registration error', error.response.data)
           
        }finally{
            setLoading(false);
        }

        //send the registration data to  backend API
    }

  return (
    <>
    <div className='RegisterContainer'>
    
        <h1>Create an Account</h1>

        <form onSubmit ={handleRegistration}>
            <input type="text" placeholder='First Name' 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
            
            <input type="text" placeholder='Last Name' 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />

            <input type="email" placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <small>{errors.email && <div className='text-danger'>{errors.email}</div>}</small>

            <input type="password" placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <small>{errors.password && <div className='text-danger'>{errors.password}</div>}</small>
             
             {successMessage && <div className='text-success fw-bold mt-2'>Registration successful!</div>}
             {loading? (
                <button type='submit' className='btn btn-info d-block mx-auto' disabled><i className="fa fa-spinner fa-spin me-2"></i>Please wait....</button>
             ) :(
                 <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
             )}
            
        </form>
    </div>
    
    </>
  )
}

export default Register