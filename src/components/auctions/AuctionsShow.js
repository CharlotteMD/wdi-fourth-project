import React from 'react';

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
      details: ''
      // bids: [ bidSchema ]

    }
  }

  // let date = (moment(checkInDate).format('LL'));

  componentDidMount() {
    Axios
      .get(`/api/auctions/${this.props.match.params.id}`)
      .then(res => this.setState({ auction: res.data }))
      .catch(err => console.log(err));
  }



  render() {
    return(
      <div className="auction-show">
        <div className="row">

          <ul>



            <a href={`/hotels/${this.state.auction.hotel._id}`}>
              <h2>{this.state.auction.hotel.name}</h2>
            </a>

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

            {' '}

            <li>
              {this.state.auction.bids}
            </li>

          </ul>


        </div>
      </div>
    );
  }
}



export default AuctionsShow;
