import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';


import Axios from 'axios';

// import HotelsEdit from './HotelsEdit';

class HotelsShow extends React.Component {
  state = {
    hotel: {
      name: '',
      image: '',
      location: '',
      info: '',
      amenities: [''],
      stars: '',
      auctions: ['']
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

        <p>{this.state.hotel.amenities}</p>

        {/* { this.state.hotels.map((hotel, i) => {
          return <div key={i}>
            <ul>
              <li><p>{hotel.amenities}</p></li>
            </ul>
          </div>;
        })} */}

        {/* if user owns the hotel */}

        <h4>Create New Auction</h4>
        <Link to="/auctions/new">
          <button className="main-button">New Auction</button>
        </Link>

        <div>
          <Link to={`/hotels/${this.state.hotel._id}/edit`}>
            <button className="main-button">Edit Hotel</button>
          </Link>

          <button className="main-button" onClick={this.deleteHotel}>
            Delete Hotel
          </button>
          <p>This will also delete any auctions associated with your hotel</p>

          {/* <p>{this.state.hotel}</p> */}

          {/* <div className="currentAuctions">

            {this.state.hotel && this.state.hotel.auctions.map(auction => {
              return(
                <div key={auction.id}>
                  <p>{auction.checkInDate}</p>
                  <a href={`/auctions/${auction._id}`}>
                    <p>{auction.board}</p>
                  </a>
                </div>
              );
            })}

          </div> */}

        </div>
      </div>
    );
  }
}



export default HotelsShow;
