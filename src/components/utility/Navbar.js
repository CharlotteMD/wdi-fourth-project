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
      <div className="navbar">
        <ul>


          { !Auth.isAuthenticated() &&
          <li className="nav-item">
            <a className="nav-link" href="/register">Register</a>
          </li>}

          { !Auth.isAuthenticated() &&
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>}

          {Auth.isAuthenticated() &&
          <li className="nav-item">
            <a className="nav-link" href={`/users/${Auth.getPayload().userId}`}>Your Profile</a>
          </li>}

          {Auth.isAuthenticated() &&
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={logout}>Logout</a>
          </li>}

          

        </ul>

      </div>

    </nav>

  );
};

export default withRouter(Navbar);
