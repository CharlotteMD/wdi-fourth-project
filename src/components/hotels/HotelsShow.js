import React from 'react';

import Axios from 'axios';

class HotelsShow extends React.Component {
  state = {
    hotel: {
      name: '',
      image: '',
      location: '',
      info: '',
      amenities: [''],
      stars: ''
    }
  }

  componentDidMount() {
    Axios
      .get(`/api/hotels/${this.props.match.params.id}`)
      .then(res => this.setState({ hotel: res.data }))
      .catch(err => console.log(err));
  }

  deleteHotel = () => {
    Axios
      .delete(`/api/hotels/${this.state.hotel._id}`)
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

        {/* <div>
          <Link to={`/users/${this.state.hotel._id}/edit`}>
          <button className="main-button">Edit Hotel</button>
        </Link> */}

        <button className="main-button" onClick={this.deleteHotel}>
          Delete Hotel
        </button>
        <p>This will also delete any auctions associated with your hotel</p>

      </div>

    );
  }
}



export default HotelsShow;
