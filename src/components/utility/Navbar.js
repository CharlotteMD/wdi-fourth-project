import React from 'react';
import { withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';
// import AuthRoutes from '../auth/AuthRoutes';


const Navbar = ({ history }) => {
  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/auctions');
  }

  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">GetARoom</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">

          { !Auth.isAuthenticated() &&
            <li className="nav-item">
              <a className="dropdown-item" href="/register">Register</a>
            </li>}

          { !Auth.isAuthenticated() &&
            <li className="nav-item">
              <a className="dropdown-item" href="/login">Login</a>
            </li>}

          {Auth.isAuthenticated() &&
            <li className="nav-item">
              <a className="nav-link" href={`/users/${Auth.getPayload().userId}`}>Your Profile</a>
            </li>}

          {Auth.isAuthenticated() &&
            <li className="nav-item">
              <a href="/" className="standard-button" onClick={logout}>Logout</a>
            </li>}

          <li className="nav-item">
            <a className="nav-link" href="/auctions">View Current Auctions</a>
          </li>

        </ul>
      </div>
    </nav>

  );
};

export default withRouter(Navbar);
