import React from 'react';

import Axios from 'axios';

// import moment from 'moment';

import Auth from '../../lib/Auth';


class UserProfile extends React.Component {
  state = {
    user: {
      name: '',
      email: '',
      password: ''
    }
    // auction: {
    //   hotel: {
    //     name: '',
    //     image: '',
    //     website: '',
    //     location: '',
    //     amenities: [''],
    //     info: '',
    //     admin: {
    //       name: ''
    //     },
    //     stars: ''
    //   },
    //   reservePrice: '',
    //   checkInDate: '',
    //   nights: '',
    //   maxGuests: '',
    //   board: '',
    //   details: '',
    //   bids: [{
    //     bid: '',
    //     createdBy: ''
    //   }]
    // }
  }



  componentDidMount() {

    Axios
      .get(`/api/users/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
    // need to set authorization header with token as second argument of get request. for post/put requests with secureRoute it needs to be the third argument
      .then(res => {
        console.log(res.data);
        if ((this.props.match.params.id) === ('undefined'))  {

          (this.props.history.push('/login'));

        } else {

          (this.setState({ user: res.data }));

        }
      })
      .catch(err => console.log(err));

  }

  deleteUser = () => {
    // Axios
    //   .delete(`/api/hotels/${this.state.hotel._id}`)
    //   .then(() => this.props.history.push('/'))
    //   .catch(err => console.log(err));

    Axios
      .delete(`/api/users/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }


  render() {
    return(
      <div className="userProfile">

        <div className="userInfo">

          <h2>Welcome back, {this.state.user.name}</h2>

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



            {/* <a href={this.user.hotel._id}><img src={this.user.hotel.image} /></a> */}


          </div>

        </div>

      </div>

    );
  }
}



export default UserProfile;
