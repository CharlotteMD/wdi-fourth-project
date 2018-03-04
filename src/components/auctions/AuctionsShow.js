import React from 'react';
import { Link } from 'react-router-dom';

import Axios from 'axios';

import moment from 'moment';

import Auth from '../../lib/Auth';


class AuctionsShow extends React.Component {
  state = {
    auction: {
      hotel: {
        name: '',
        image: ''},
      reservePrice: '',
      checkInDate: '',
      nights: '',
      maxGuests: '',
      board: '',
      details: '',
      bids: {
        amount: '',
        createdBy: ''
      }

    }
  }

  // let date = (moment(checkInDate).format('LL'));

  componentDidMount() {
    Axios
      .get(`/api/auctions/${this.props.match.params.id}`)
      .then(res => this.setState({ auction: res.data }), () => console.log(this.state))
      .catch(err => console.log(err));
  }

  deleteAuction = () => {
    Axios
      .delete(`/api/auctions/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(() => this.props.history.push('/auctions'))
      .catch(err => console.log(err));
  }

  handleBidChange = ({ target: { name, value } }) => {
    const bid = Object.assign({}, this.state.bid, { [name]: value });
    this.setState({ bid });
    console.log('bid info: ', bid);
  }

  handleBidSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/auctions/${this.props.match.params.id}`, this.state.auction,
        { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(res => this.props.history.push(`/auctions/${res.data.id}`))
      .catch(err => console.log(err));
  }


  render() {
    return(
      <div className="auction-show">
        <div className="sectionone">
          <ul>


            <li>
              <a href={`/hotels/${this.state.auction.hotel._id}`}>
                <h2>{this.state.auction.hotel.name}</h2>
              </a>
            </li>

            <li>
              <img src={this.state.auction.hotel.image}/>
            </li>

            <li>
              <p>{this.state.auction.details}</p>
            </li>

            <li>
              From: {moment(this.state.auction.checkInDate).format('do MMMM, YYYY')}, for {this.state.auction.nights} nights
            </li>

            <li>
              Maximum of {this.state.auction.maxGuests} Guests
            </li>

            <li>
              {this.state.auction.board}
            </li>


            <button className="main-button" onClick={this.deleteAuction}>
              Delete Auction
            </button>

            <Link to={`/auctions/${this.state.auction._id}/edit`}>
              <button className="main-button">Edit Auction</button>
            </Link>
          </ul>
        </div>

        <div className="sectiontwo">

          <h3>Your Bids</h3>
          {/* {this.state.auction && this.state.auction.bids.map(bid => {
            return(
              // <div key={bid.id}>
              //
              //
              //   <p>Your Bids</p>
              //   <p>{bid.bid.filter(bid => bid.createdBy === this.state.auction.id).reduce((topBid, bid) => topBid > bid.bid ? topBid : bid.bid, 0)}</p>
              //
              //   <p>Current Highest Bid</p>
              //   <p>{bid.bid.reduce((topBid, bid) => topBid > bid.bid ? topBid : bid.bid, 0)}</p>
              //
              // </div>
            );
          })} */}


        </div>


        <div className="sectiontwo">

          <h3>Make a bid</h3>

          <form onSubmit={this.handleBidSubmit} className="form-inline">
            <div className="form-group mb-2">
              <label htmlFor="staticEmail2" className="sr-only">Bid for this room</label>
              <input
                type="number"
                name="bid"
                className="form-control-number"
                id="bid"
                onChange={this.handleBidChange}
                value={this.state.auction.bids.amount}
              />
              <button type="submit" className="btn btn-primary mb-2">Make Bid</button>
            </div>
          </form>

        </div>
      </div>

    );
  }
}



export default AuctionsShow;
