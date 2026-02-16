import React from 'react';
import logo from '../images/logo.jpg';
import '../index.css';
import {NavLink,useNavigate} from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Home = () => {
const styles={
   color:"green",
   fontWeight:'bold', 
   fontSize:'20px',
   cursor:'pointer'
};
  
    
  return (
    <>
    <div className="logo-container">
    <img src={logo} alt="Agricircle Logo" />
    </div>
    
    <div className="home-container">
      <h1>Welcome to Agricircle</h1>
      <p>Your one-stop solution for agricultural needs.</p>
    </div>
    <div className="label-container">

      <label>Are you a passionate farmer ready to  share your skills with the world this is the platform <br/> <span style={styles}> POST YOUR SKILLS </span>  <br/></label>
  
      <label>Do you have  available stock  <span style={styles}>POST SUPPLY </span>  to stores and people near you<br/></label>
      <label>Are you a store owner looking for reliable suppliers <br/> <span style={styles}> FIND SUPPLIERS </span> <br/> to meet your inventory needs<br/></label>

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