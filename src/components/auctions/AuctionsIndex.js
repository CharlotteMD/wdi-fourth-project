import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class AuctionsIndex extends Component {
      state = {
        auctions: [{
          hotel: [{
            name: '',
            image: '',
            location: '',
            amenities: '',
            stars: ''
          }],
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
          <div>
            <h1>Current Auctions</h1>
            <div>
              <div className="container">
                <div className="row">

                  { this.state.auctions.map(auctions =>
                    <div key={auctions.id} >
                      <div className="col-sm">
                        <div className="card">

                          <ul>
                            <li>
                              <a href={`hotels/${auctions.hotel._id}`}>
                                <h3>{auctions.hotel.name}</h3>
                              </a>
                            </li>
                            <li>
                              From: {auctions.checkInDate}, for {auctions.nights} nights
                            </li>
                            <li>
                              Reserve Price: £{auctions.reservePrice}
                            </li>
                            <li>
                              {auctions.maxGuests} Guests
                            </li>

                            <Link to={`/auctions/${auctions.id}`}>
                              <button>More Info</button>
                            </Link>

                          </ul>
                        </div>
                      </div>
                    </div>
                  )}


                </div>
              </div>
            </div>
          </div>
        );
      }
}


export default AuctionsIndex;
