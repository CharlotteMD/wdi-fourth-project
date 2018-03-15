import React from 'react';

import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
  state = {
    user: null
  }

  render() {
    return(

      <div className="landing">
        <h1>Welcome to</h1>
        <img src="./assets/images/GetARoom.png"></img>

        <h2>Get a Room is an auction website for hotel rooms. Guests can find brilliant last minute deals for the most luxurious hotel rooms in London. Hotels can fill their unsold rooms and entice new guests to stay with them.</h2>

        <Link to={'/register'}>
          <h3>Get Started!</h3>
        </Link>

        <p><Link to={'/register'}>Register</Link> as a guest or a hotel or head to <Link to={'/auctions'}>view auctions</Link> to check out the latest deals!</p>

        <p>Hotels! <Link to={'/register'}>Register</Link> your hotel and start auctioning your unsold rooms!</p>

      </div>
    );
  }
}
export default LandingPage;
