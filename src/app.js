import React    from 'react';
import ReactDOM from 'react-dom';

import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <h1>WDI Project 4</h1>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
