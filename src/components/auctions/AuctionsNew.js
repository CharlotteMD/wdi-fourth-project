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
    },
    errors: {}
  };

  handleAuctionChange = ({ target: { name, value }}) => {
    const auction = Object.assign({}, this.state.auction, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ auction, errors });
    console.log('auction info: ', auction);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post(`/api/auctions/new/${this.props.match.params.hotelId}`, this.state.auction, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(res => {
        console.log('the response from the api', res);
        // take url for hotel
        (this.props.history.push(`/users/${Auth.getPayload().userId}`));
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }




  render() {
    return (
      <div>
        <h1>Create a New Auction</h1>
        <AuctionsForm
          auction={this.state.auction}
          handleAuctionChange={this.handleAuctionChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default Register;
