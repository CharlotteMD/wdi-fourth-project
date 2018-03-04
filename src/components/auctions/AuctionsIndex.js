import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

class AuctionsIndex extends Component {
      state = {
        auctions: [{
          hotel: {
            name: '',
            image: '',
            location: '',
            amenities: '',
            stars: ''
          },
          reservePrice: '',
          checkInDate: '',
          nights: '',
          maxGuests: '',
          board: '',
          details: '',
          bids: [{
            createdBy: {
              name: ''
            },
            bid: ''
          }]
        }]
      }


      componentDidMount() {
        Axios
          .get('/api/auctions')
          .then(res => this.setState({ auctions: res.data }))
          .catch(err => console.log(err));
      }

      render() {
        return(
          <div className="auction-index">
            <h1>Current Auctions</h1>
            <div>
              {/* <div className="container"> */}
                <div className="row">

                  { this.state.auctions.map((auction, i) => {
                    return <div key={i}>
                      <div className="col-sm">
                        <div className="card">

                          <ul>
                            <li>
                              <a href={`hotels/${auction.hotel._id}`} className="hotelShow">
                                <h3>{auction.hotel.name}</h3>
                              </a>
                            </li>
                            <li>
                              <img src={auction.hotel.image} alt={auction.hotel.name} >
                              </img>
                            </li>
                            {' '}
                            <li>
                              From: {moment(auction.checkInDate).format('do MMMM, YYYY')}, for {auction.nights} nights
                            </li>
                            <li>
                              Reserve Price: £{auction.reservePrice}
                            </li>
                            <li>
                              {auction.maxGuests} Guests
                            </li>

                            <div className="showlink">
                              <Link to={`/auctions/${auction.id}`}>
                                <button>View Auction</button>
                              </Link>
                            </div>

                          </ul>
                        </div>
                      </div>
                    </div>;
                  })}


                </div>
              </div>
            </div>
          // </div>
        );
      }
}


export default AuctionsIndex;
