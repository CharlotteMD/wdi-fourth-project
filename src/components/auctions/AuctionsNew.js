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
    console.log('auction info: ', auction);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post(`/api/auctions/new/${this.props.match.params.hotelId}`, this.state.auction, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(res => {
        console.log('the response from the api', res);
        // take url for hotel
        this.props.history.push(`/auctions/${res.data._id}`);
      })
      .catch(err => console.log(err));
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
      </div>
    );
  }
}

export default Register;
