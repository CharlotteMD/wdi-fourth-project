import React from 'react';
// import { withRouter } from 'react-router-dom';
//
// import Auth from '../../lib/Auth';
// // import AuthRoutes from '../auth/AuthRoutes';


const Footer = () => {

  return(
    <div className="footer">

      <h2>Coded by Charlotte 👩🏻‍💻</h2>
      <ul>
        <li>
          <button><a href="https://github.com/CharlotteMD">Github</a></button>
        </li>

        <li>
          <button><a href="https://www.linkedin.com/in/charlottemdavies/">LinkedIn</a></button>
        </li>

        <li>
          <button><a href="https://www.charlottemdavies.co.uk/">Portfolio</a></button>
        </li>
      </ul>

    </div>

  );
};

export default Footer;
