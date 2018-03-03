import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap-css-only';
import './scss/style.scss';

import Navbar from './components/utility/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserProfile from './components/auth/UserProfile';
import UserEdit from './components/auth/UserEdit';

import AuctionsRoutes from './components/auctions/AuctionsRoutes';
import HotelsRoutes from './components/hotels/HotelsRoutes';

import Auth from './lib/Auth';



class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <div className="title">

            <header>
              <Navbar />
              {/* <Link to="/"><h1>GetARoom.com</h1></Link> */}
              {/* <h2>Pay what you want for the best hotels in London</h2> */}

            </header>

            <a className="app-nav" href="/auctions">View Current Auctions</a>

          </div>


          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <AuctionsRoutes />
          <HotelsRoutes />

          <Route exact path="/users/:id/edit" component={UserEdit}/>
          <Route exact path="/users/:id" component={UserProfile}/>




        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
