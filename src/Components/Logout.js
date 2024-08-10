// src/components/LogoutButton.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(()=>{
   // Remove JWT token from local storage
   localStorage.removeItem('jwtToken');

   // Redirect to login page
   navigate('/login');
  },[])

 

  return <></>;
};

export default Logout;
