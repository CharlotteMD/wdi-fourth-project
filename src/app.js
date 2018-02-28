import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
          <Navbar />
  
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
