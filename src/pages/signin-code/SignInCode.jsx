import React from 'react';
import './signincode.css';
import { Link } from 'react-router-dom';

const SignInCode = () => {
  return (
    <div className="signin-container-code">
      <div className="signin-box-code">
        <h1>Sign In</h1>
        <p>Enter the code sent to your subscriber number.</p>
        <input type="text" placeholder="Enter subscriber code" className="signin-input-code" />
        <button className="signin-code-button">Send Code</button>
        <div className="info-text-code">
          <p>The subscriber code is used to log into the business application.</p>
        </div>
        <Link to='/'>Back</Link> 
      </div>
    </div>
  );
};

export default SignInCode;
