import React from 'react';

import Axios from 'axios';

class HotelsShow extends React.Component {
  state = {
    hotel: {}
  }

  componentDidMount() {
    Axios
      .get(`/api/hotels/${this.props.match.params.id}`)
      .then(res => this.setState({ hotel: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div className="hotel-show">
        <div className="row">



          <h2>{this.state.hotel.name}</h2>
          <h3>{this.state.hotel.location}</h3>
          <h3>{this.state.hotel.stars}⭐️</h3>


          <img src="{this.state.hotel.image}" />

          <p>{this.state.hotel.amenities}</p>


        </div>
      </div>
    );
  }
}



export default HotelsShow;
