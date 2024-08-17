// src\Component\Login.js

import React, { useState} from 'react'
import {useNavigate  } from 'react-router-dom'
import PropTypes from 'prop-types';

const Login = (props) => {
  const [credential, setCredential] = useState({ email: '', password: '' });
  let navigate =useNavigate ();
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credential.email, password: credential.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success)
    {
      // save the auth token and redirect it
      localStorage.setItem('token',json.authtoken);
      console.log('Registration successful:', json);
      props.showAlert('Login succesfuly', 'Success');
      navigate("/"); 
    }
    else
    {
      props.showAlert('Please try again', 'Fail');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label" onChange={onChange}><b>Email address</b></label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={credential.email} 
            onChange={onChange} 
            aria-describedby="emailHelp" 
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" onChange={onChange}><b>Password</b></label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={credential.password} 
            onChange={onChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  showAlert: PropTypes.func.isRequired,
};
export default Login;
