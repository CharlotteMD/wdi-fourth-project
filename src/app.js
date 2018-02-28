import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap-css-only';
import './scss/style.scss';

import Navbar from './components/utility/Navbar';
import Register from './components/auth/Register';


class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <h1>WDI Project 4</h1>
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
