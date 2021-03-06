import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap-css-only';
import './scss/style.scss';

import Navbar from './components/utility/Navbar';
import Footer from './components/utility/Footer';
import LandingPage from './components/utility/LandingPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserProfile from './components/auth/UserProfile';
import UserEdit from './components/auth/UserEdit';

import AuctionsRoutes from './components/auctions/AuctionsRoutes';
import HotelsRoutes from './components/hotels/HotelsRoutes';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <div className="title">

            <header>

              <Navbar />

              <Link to="/"><h1>Get A Room</h1></Link>
            </header>

            <a className="app-nav" href="/auctions"><button>View Current Auctions</button></a>

          </div>

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />

          <Route exact path="/" component={LandingPage} />

          <AuctionsRoutes />
          <HotelsRoutes />

          <Route exact path="/users/:id/edit" component={UserEdit}/>
          <Route exact path="/users/:id" component={UserProfile}/>

          <Footer />

        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
