import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap-css-only';
import './scss/style.scss';

import Navbar from './components/utility/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import AuctionsRoutes from './components/auctions/AuctionsRoutes';
import HotelsRoutes from './components/hotels/HotelsRoutes';




class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar />
            <Link to="/"><h1>GetARoom.com</h1></Link>
            <h2>Pay what you want for the best hotels in London</h2>
          </header>

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <AuctionsRoutes />
          <HotelsRoutes />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
