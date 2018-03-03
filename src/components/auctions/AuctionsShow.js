import React from 'react';
import { Link } from 'react-router-dom';

import Axios from 'axios';

import moment from 'moment';

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
        bid: '',
        createdBy: ''
      }

    }
  }

  // let date = (moment(checkInDate).format('LL'));

  componentDidMount() {
    Axios
      .get(`/api/auctions/${this.props.match.params.id}`)
      .then(res => this.setState({ auction: res.data }))
      .catch(err => console.log(err));
  }

  deleteAuction = () => {
    Axios
      .delete(`/api/auctions/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }



  render() {
    return(
      <div className="auction-show">
        <div className="row">

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

            {/* <li>
              {this.state.auction.bids}
            </li> */}

            <button className="main-button" onClick={this.deleteAuction}>
              Delete Auction
            </button>

            <Link to={`/auctions/${this.state.auction._id}/edit`}>
              <button className="main-button">Edit Auction</button>
            </Link>


          </ul>


        </div>
      </div>
    );
  }
}



export default AuctionsShow;
