import React,{useState,useContext, use} from 'react'
import {NavLink,useNavigate,useLocation} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { AuthContext } from '../AuthProvider';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const loginData = {
      username: email,
      password
    }
    console.log('Login data==>',loginData)
    //send the login data to  backend API

    try {
       const response = await axios.post('http://127.0.0.1:8000/api/v1/token/',loginData)
       localStorage.setItem('accessToken', response.data.access)
       localStorage.setItem('refreshToken', response.data.refresh)
       console.log('login successful');
        setIsLoggedIn(true);
        navigate(from, { replace:true });
    }catch(error){
      
      console.error('incorrect login details')
      setError('Incorrect email or password')
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
    <div className='LoginContainer'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input 
            type="text" 
            placeholder='Email'
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            />
            
            <input 
            type="password" 
            placeholder='Password' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />

            {error && <div className='text-danger'>{error}</div>}
            {loading? (
                <button type='submit' className='btn btn-info d-block mx-auto' disabled><i className="fa fa-spinner fa-spin me-2"></i>Please wait....</button>
             ) :(
                 <button type='submit' className='btn btn-info d-block mx-auto'>Login</button>
             )}

            <p> OR </p> <br/>

            <label>
              <NavLink to="/Register">
                create new account
              </NavLink>

            </label>

        </form>
    </div>
    </>
  )
}

export default Login
 