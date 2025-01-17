import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem('authtoken');
    navigate('/signup');
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          {localStorage.getItem('authtoken') ? (
            <button type="button" onClick={handleLogOut} className="btn btn-outline-primary mx-2">Log Out</button>
          ) : (
            <form className="d-flex" role="search">
              <Link type="button" className="btn btn-outline-primary mx-2" to="/login">Login</Link>
              <Link type="button" className="btn btn-outline-secondary mx-2" to="/signup">Sign Up</Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
