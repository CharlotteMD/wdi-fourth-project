import React from 'react';

import { Link } from 'react-router-dom';

import Axios from 'axios';

import Auth from '../../lib/Auth';

import moment from 'moment';

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
      .delete(`/api/users/${this.props.match.params.id}`,
        { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(() => this.props.history.push('/auctions'))
      .catch(err => console.log(err));
  }


  render() {
    return(
      <div className="userProfile">

        <div className="userInfo">

          {this.state.user && <h2>Welcome back, {this.state.user.name}</h2>}


          <div>

            <Link to={`/users/${Auth.getPayload().userId}/edit`}>
              <button className="main-button">Edit Profile</button>
            </Link>

            <button className="main-button" onClick={this.deleteUser}>
              Delete Your Profile
            </button>
            <p>This will also delete your hotel & any auctions associated</p>

          </div>

          <div className="hotel-show">

            <h3>Your Hotels</h3>

            <Link to="/hotels/new">
              <button className="main-button">New Hotel</button>
            </Link>
            <div className="container">
              <div className="row">
                {this.state.user && this.state.user.hotels.map((hotel, i) => {
                  return(
                    <div key={i} className="col-md-6 col-sm-6 col-xs-12">
                      <h4>{hotel.name}</h4>
                      <a href={`/hotels/${hotel.id}`}>
                        <img src={hotel.image}/>
                      </a>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="hotel-show bids">

            <div className="bids">
              <h3>Your Bids</h3>

              {this.state.user && this.state.user.bids.length === 0 &&
                <p>You have not bid on anything yet.</p>
              }
              <div className="container">
                <div className="row">
                  {this.state.user && this.state.user.bids.reduce((accumulator, element) => {
                    if(accumulator.some(auction => auction.id === element.id)) {
                      return accumulator;
                    } else {
                      const newAuction = {
                        id: element.id,
                        hotelName: element.hotel.name,
                        hotelImage: element.hotel.image,
                        hotelLink: element.hotel._id,
                        auctionLink: element.id,
                        auctionDates: element.checkInDate
                      };
                      accumulator.push(newAuction);
                      return accumulator;
                    }
                  }, []).map((auction) => {
                    return(
                      <div key={auction.id} className="col-md-6 col-sm-6 col-xs-12">
                        <div >
                          <a href={`/auctions/${auction.auctionLink}`}><img src={auction.hotelImage}/></a>
                          <a href={`/hotels/${auction.hotelLink}`}><p>{auction.hotelName}</p></a>

                          <p>
                            {moment(auction.auctionDates).format('do MMMM, YYYY')}
                          </p>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}
export default UserProfile;
