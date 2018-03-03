import React from 'react';
import Axios from 'axios';

import AuctionsForm from '../auctions/AuctionsForm';
import Auth from '../../lib/Auth';

class Register extends React.Component {

  state = {
    auction: {
      hotel: '',
      reservePrice: '',
      checkInDate: '',
      nights: '',
      maxGuests: '',
      board: '',
      details: ''
    }
  };

  handleAuctionChange = ({ target: { name, value }}) => {
    const auction = Object.assign({}, this.state.auction, { [name]: value });
    this.setState({ auction });
  }

  // toggleHotelForm = (e) => {
  //   if (e.target.value === 'auction') {
  //     this.setState({ showHotelForm: true });
  //   } else {
  //     this.setState({ showHotelForm: false });
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/auctions', this.state.auction)
      .then(res => {
        Auth.setToken(res.data.token);
        // take url for hotel

        Axios
          .post('/api/auctions/new', this.state.auction, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
          .then(res => this.props.history.push(`/auctions/${res.data._id}`));
      });
  }


  render() {
    return (
      <div>
        <h1>Create a New Auction</h1>
        <AuctionsForm
          auction={this.state.auction}
          handleAuctionChange={this.handleAuctionChange}
          handleSubmit={this.handleSubmit}
        />
        <button onClick={this.state.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Register;
