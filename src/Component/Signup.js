import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Signup = (props) => {
  const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credential.password !== credential.cpassword) {
      props.showAlert('Passwords do not match', 'danger');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        props.showAlert('Sign-Up successful', 'success');
        navigate("/");
      } else {
        props.showAlert('Invalid credentials', 'danger');
      }
    } catch (error) {
      console.error('Error:', error);
      props.showAlert('An error occurred', 'danger');
    }
  };

  
  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            value={credential.name}
            aria-describedby="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credential.email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credential.password}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            value={credential.cpassword}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

Signup.propTypes = {
  showAlert: PropTypes.func.isRequired,
};

export default Signup;
