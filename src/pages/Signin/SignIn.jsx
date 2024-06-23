import React, { useState } from 'react';
import './signin.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';

const SignIn = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
const [phoneNumber,setPhoneNumber]=useState('')
const singin=async(e)=>{
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3541/api/v1/users/signin', {phoneNumber}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.status == 200)
      {
        signIn({
          token: response.data.user,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { phoneNumber: response.data.phoneNumber },
        });
        setTimeout(() => {
   
          navigate('/chat')
        }, 500);
       
      }
    console.log(phoneNumber)
    console.log(response)
  } catch (error) {
    console.log(error)
    
  }
}
  return (
    <form onSubmit={singin}>
 
    <div className="signin-container">
      <div className="signin-box">
        <h1>Welcome</h1>
        <p>Enjoy all our services anytime, anywhere.</p>
        <input 
    
          className="styled-number-input" 
          placeholder="Enter your number" 
          value={phoneNumber}
          onChange={(e)=>setPhoneNumber(e.target.value)}
        />
        <button className="signin-button" type='submit'>Sign In</button>
        <Link to='/signincode'>Register with Subscriber Code</Link>
      </div>
    </div>
         
    </form>
  );
};

export default SignIn;
