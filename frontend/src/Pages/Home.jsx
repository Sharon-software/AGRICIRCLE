import React from 'react';
import logo from '../images/logo.jpg';
import '../index.css';
import {NavLink,useNavigate} from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Postskill from './Postskill';
import PostSupply from './PostSupply';
import FindSuppliers from './FindSuppliers';


const Home = () => {
const styles={
   color:"green",
   fontWeight:'bold', 
   fontSize:'20px',
   cursor:'pointer'
};
const navigate = useNavigate()
  
    
  return (
    <>
    <div className="logo-container">
    <img src={logo} alt="Agricircle Logo" />
    </div>
    
    <div className="home-container">
      <h1>Welcome to Agricircle</h1>
    </div>
    <div className="label-container">

  <label>
  
  Are you a passionate farmer ready to share your skills with the world?
  <br />
  This is the platform to{" "}
  <NavLink to="/PostSkill" style={styles}>
    POST YOUR SKILLS
  </NavLink>
  <br />

</label>

<label>
  Do you have available stock to offer stores and people near you?
  <br />
  <NavLink to="/PostSupply" style={styles}>
    POST YOUR SUPPLY
  </NavLink>
  <br />
</label>

<label>
  Are you a store owner looking for reliable suppliers?
  <br />
  <NavLink to="/FindSuppliers" style={styles}>
    FIND SUPPLIERS
  </NavLink>
  <br />
  to meet your inventory needs
  <br />
</label>
</div>
    
    <footer>
      <div className='line'>
      <p>&copy; 2025 AgriCircle. All rights reserved. Visison by Buthelezi NM</p>
      </div>
    
    <div className='icons'>
    <a 
      href="https://wa.me/1234567890" 
      target="_blank" 
      rel="noopener noreferrer"> 
       <FaWhatsapp  />
   </a>
   <a 
      href="https://wa.me/1234567890" 
      target="_blank" 
      rel="noopener noreferrer"> 
        <FaPhoneSquareAlt  />
   </a>
   <a 
      href="https://wa.me/1234567890" 
      target="_blank" 
      rel="noopener noreferrer"> 
        <FaSquareXTwitter  />
   </a>

    </div>
    </footer>
    </>
  )
}

export default Home