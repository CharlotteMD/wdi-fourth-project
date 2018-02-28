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
    <nav >

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

    </nav>

  );
};

export default withRouter(Navbar);
