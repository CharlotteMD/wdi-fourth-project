import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';
import AuthRoutes from '../auth/AuthRoutes';

const Navbar = ({ history }) => {
  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/auctions');
  }

  return(
    <nav>
      {/* need to define if the person is a user or hotel */}


      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">GetARoom</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">

            {/* Not logged in */}

            { !Auth.isAuthenticated() &&
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Guests
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/users/register">Register</a>
                <a className="dropdown-item" href="/users/login">Login</a>
              </div>
            </li>}

            { !Auth.isAuthenticated() &&
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Hotels
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/hotels/register">Register</a>
                <a className="dropdown-item" href="/hotels/login">Login</a>
              </div>
            </li>}

            { !Auth.isAuthenticated() &&
            <li className="nav-item">
              <a className="nav-link" href="/auctions">View Current Auctions</a>
            </li>}

            {Auth.isAuthenticated() && Auth.getUserId() && <li className="nav-item">
              <a href="/" className="standard-button" onClick={logout}>Logout</a>
            </li>}

            {Auth.isAuthenticated() && Auth.getUserId() && <li className="nav-item">
              <a className="nav-link" href={`/users/${Auth.getPayload().userId}`}>Your Profile</a>
            </li>}

            {Auth.isAuthenticated() && Auth.getHotelId() &&<li className="nav-item">
              <a href="/" className="standard-button" onClick={logout}>Logout</a>
            </li>}

            {Auth.isAuthenticated() && Auth.getHotelId() &&
            <li className="nav-item">
              <a className="nav-link" href={`/hotels/${Auth.getPayload().hotelId}`}>Your Profile</a>
            </li>}

          </ul>
        </div>
      </nav>






      {/* { !Auth.isAuthenticated() &&<Link to="/login" className="standard-button">Login</Link>}
      {' '}
      { !Auth.isAuthenticated() && <Link to="/register" className="standard-button">Register</Link>}
      {' '}
      { Auth.isAuthenticated() && <a href="#" className="standard-button" onClick={logout}>Logout</a>}
      {' '}
      { Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().userId}`} className="standard-button">Your Profile</Link>} */}

    </nav>
  );
};

export default withRouter(Navbar);
