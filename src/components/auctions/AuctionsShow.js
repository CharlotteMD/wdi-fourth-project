import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Axios from 'axios';

import moment from 'moment';

import Auth from '../../lib/Auth';


class AuctionsShow extends React.Component {
  state = {
    auction: {
      hotel: {
        name: '',
        image: '',
        admin: ''
      },
      reservePrice: '',
      checkInDate: '',
      nights: '',
      maxGuests: '',
      board: '',
      details: '',
      bids: []
    },
    newBid: {
      amount: ''
    },
    bidMessage: null
  }

  // let date = (moment(checkInDate).format('LL'));

  componentDidMount() {
    Axios
      .get(`/api/auctions/${this.props.match.params.id}`)
      .then(res => this.setState({ auction: res.data}))
      .catch(err => console.log(err));
  }

  findWinningBid() {
    return this.state.auction.bids.length !== 0 ?
      this.state.auction.bids.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
      :
      false;
  }

  findCurrentUserTopBid() {
    return this.state.auction.bids.some(bid => bid.createdBy === Auth.getPayload().userId) ?
      this.state.auction.bids.filter(bid => bid.createdBy === Auth.getPayload().userId).reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
      :
      false;
  }

  removeMessage = () => {
    this.setState(prevState => {
      const newState = prevState;
      newState.bidMessage = null;
      return newState;
    });
  }

  isCurrentUserWinning() {
    return this.findWinningBid().createdBy === Auth.getPayload().userId;
  }

  deleteAuction = () => {
    Axios
      .delete(`/api/auctions/${this.props.match.params.id}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(() => this.props.history.push('/auctions'))
      .catch(err => console.log(err));
  }

  handleBidChange = ({ target: { value } }) => {
    value = parseInt(value);
    this.setState({ newBid: { amount: value }});
  }

  handleBidSubmit = (e) => {
    e.preventDefault();

    const request = () => {
      Axios
        .post(`/api/auctions/${this.props.match.params.id}/bids`, this.state.newBid,
          { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
        .then(res => {
          const auction = Object.assign({}, this.state.auction, { bids: res.data.bids });
          this.setState({ auction, newBid: { amount: '' } });
        })
        .catch(err => console.log(err));
    };

    if(this.findWinningBid()) {

      if(this.state.newBid.amount > this.findWinningBid().amount) {
        request();
      } else {
        this.setState(prevState => {
          console.log('prevState => ', prevState);
          const newState = prevState;
          newState.bidMessage = 'Your bid is not the highest';
          console.log('newState => ', newState);
          return newState;
        }, () => console.log('message being set, other highter bid', this.state));
        setTimeout(this.removeMessage, 5000);
      }

    } else {

      if(this.state.newBid.amount > this.state.auction.reservePrice) {
        request();
      } else {
        this.setState({bidMessage: 'Your bid is lower than the reserve price'}, () => console.log('message being set, doesn\'t meet reserve'));
        setTimeout(this.removeMessage, 5000);
      }

    }
  }


  render() {
    return(
      <div className="auction-show">



        <a href={`/hotels/${this.state.auction.hotel.id}`}>
          <h2>{this.state.auction.hotel.name}</h2>
        </a>



        <img src={this.state.auction.hotel.image}/>



        <p>{this.state.auction.details}</p>



        <div className="details">

          <p>
            From: <span>{moment(this.state.auction.checkInDate).format('do MMMM, YYYY')}</span>, for <span> {this.state.auction.nights}</span> nights
          </p>

          <p>
            Maximum of {this.state.auction.maxGuests} Guests
          </p>

          <p>
            {this.state.auction.board}
          </p>

        </div>


        { Auth.isAuthenticated() &&
          <div>
            <h3>Make a bid</h3>
            <form onSubmit={this.handleBidSubmit} className="form-inline">
              <div className="form-group mb-2">
                <label htmlFor="staticEmail2" className="sr-only">Bid for this room</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control-number"
                  id="bid"
                  onChange={this.handleBidChange}
                  value={this.state.newBid.amount}
                />
                <button type="submit" >Make Bid</button>
                { this.state.bidMessage &&
                <p className="bidMessage">{this.state.bidMessage}</p>}
              </div>
            </form>
          </div>
        }

        { Auth.isAuthenticated() && this.state.auction.bids.length !== 0 &&
          <div>
            <h3>My bid</h3>

            { this.findCurrentUserTopBid() ?
              (
                <div>
                  <p>£{ this.findCurrentUserTopBid().amount }</p>
                  { this.isCurrentUserWinning() ?
                    (<p>This is the winning bid.</p>)
                    :
                    (<p>This is not the winning bid, please bid again.</p>)
                  }
                </div>
              )
              :
              (
                <div>
                  <p>You have no bids on this auction.</p>
                </div>
              )
            }

            { this.state.auction.hotel.admin === Auth.getPayload().userId &&
              <p>The highest on this auction is currently £{this.findWinningBid().amount}</p>
            }
          </div>

        }

      </div>
    );
  }
}

export default AuctionsShow;
