import React from 'react';

import { Link } from 'react-router-dom';

import Axios from 'axios';

import Auth from '../../lib/Auth';


class UserProfile extends React.Component {
  state = {
    user: null
  }



  componentDidMount() {

    Axios
      .get(`/api/users/${Auth.getPayload().userId}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(res => {
        this.setState({ user: res.data }, () => console.log(this.state.user));
      })
      .catch(err => console.log(err));

  }

  deleteUser = () => {
    Axios
      .delete(`/api/users/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }


  render() {
    return(
      <div className="userProfile">

        <div className="userInfo">

          {this.state.user && <h2>Welcome back, {this.state.user.name}</h2>}

          <div>
            {/* <Link to={`/users/${this.state.user.id}/edit`}>
            <button className="main-button">Edit Profile</button>
          </Link> */}

            <button className="main-button" onClick={this.deleteUser}>
              Delete Your Profile
            </button>
            <p>This will also delete your hotel & any auctions associated</p>

          </div>

          <div className="hotelInfo">

            <h3>Your Hotels</h3>

            <div className="newHotel">

              <h4>Create New Hotel</h4>
              <Link to="/hotels/new">
                <button className="main-button">New Hotel</button>
              </Link>

            </div>

            {this.state.user && this.state.user.hotels.map(hotel => {
              return(
                <div key={hotel._id}>
                  <p>{hotel.name}</p>
                  <a href={`/hotels/${hotel._id}`}>
                    <img src={hotel.image}/>
                  </a>
                </div>
              );
            })}

            <div className="auctions">

              {/* view your current auctions */}
              {/*  create new auctions */}

            </div>
          </div>

          <div className="bidInfo">

            <h3>Your Bids</h3>
            {this.state.user && this.state.user.bids.map(bid => {
              return(
                <div key={bid.id}>


                  {/* <a href={`/auctions/${bid.id}`}> */}
                    <p>{bid.hotel.name}</p>
                    <img src={bid.hotel.image}/>
                  {/* </a> */}


                  {/* write some code to show whether you're winning in css and if you are yet to bid on anything, go to auctions index */}
                  <p>Your Bids</p>
                  <p>{bid.bids.filter(bid => bid.createdBy === this.state.user.id).reduce((topBid, bid) => topBid > bid.bid ? topBid : bid.bid, 0)}</p>

                  <p>Current Highest Bid</p>
                  <p>{bid.bids.reduce((topBid, bid) => topBid > bid.bid ? topBid : bid.bid, 0)}</p>

                </div>
              );
            })}
          </div>







        </div>

      </div>

    );
  }
}



export default UserProfile;
