import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';
import moment from 'moment';

import Axios from 'axios';

class HotelsShow extends React.Component {
  state = {
    hotel: {
      name: '',
      image: '',
      location: '',
      info: '',
      amenities: [],
      stars: '',
      auctions: []
    }
  }

  componentDidMount() {

    Axios
      .get(`/api/hotels/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ hotel: res.data }, () => console.log(this.state.hotel));
      })
      .catch(err => console.log(err));

  }

  deleteHotel = () => {
    Axios
      .delete(`/api/hotels/${this.props.match.params.id}`,
        { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  render() {
    return(

      <div className="hotel-show">

        <h2>{this.state.hotel.name}</h2>
        <h3>{this.state.hotel.location}</h3>
        <h3>{this.state.hotel.stars}⭐️</h3>

        <img src={this.state.hotel.image}/>

        <p className="info">{this.state.hotel.info}</p>

        <p><span>Facilities:</span></p>
        <ul>
          { this.state.hotel.amenities.map((amenity, i) => {
            return(

              <div key={i} className="facilities" >

                <li>{amenity}</li>

              </div>
            );
          })}
        </ul>

        { Auth.isAuthenticated() && (this.state.hotel.admin === Auth.getPayload().userId) &&
          <div>
            <Link to={`/auctions/new/${this.state.hotel.id}`}>
              <button className="main-button">New Auction</button>
            </Link>

            <Link to={`/hotels/${this.state.hotel.id}/edit`}>
              <button className="main-button">Edit Hotel</button>
            </Link>

            <button className="main-button" onClick={this.deleteHotel}>
              Delete Hotel
            </button>
            <p>This will also delete any auctions associated with your hotel</p>
          </div>
        }

        <div className="currentAuctions">
          <h3>Current Auctions</h3>
          <div className="yeshover">
            <div className="row">

              {this.state.hotel.auctions &&  this.state.hotel.auctions.map((auction, i) => {
                return(

                  <div key={i} className="col-md-6" >
                    <div className="details">
                      <a href={`/auctions/${auction.id}`}>

                        <p>{moment(auction.checkInDate).format('do MMMM, YYYY')}</p>

                        <p>{auction.board}</p>
                      </a>

                    </div>
                  </div>

                );
              })}
            </div>
          </div>

        </div>

      </div>

    );
  }
}

export default HotelsShow;
