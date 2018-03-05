import React from 'react';
import Axios from 'axios';

import HotelsForm from './HotelsForm';
import Auth from '../../lib/Auth';

class HotelsNew extends React.Component {
  state = {
    hotel: {
      name: '',
      image: '',
      website: '',
      location: '',
      amenities: '',
      info: '',
      stars: '',
      admin: ''
    }
  };

  handleHotelChange = ({ target: { name, value } }) => {
    const hotel = Object.assign({}, this.state.hotel, { [name]: value });
    this.setState({ hotel });
    console.log('hotel info: ', hotel);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/hotels', this.state.hotel, { headers: { 'Authorization': `Bearer ${Auth.getToken()}`} })
      .then(this.props.history.push(`/users/${Auth.getPayload().userId}`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <HotelsForm
          history={this.props.history}
          handleSubmit={this.handleSubmit}
          handleHotelChange={this.handleHotelChange}
          hotel={this.state.hotel}
        />
      </div>
    );
  }
}

export default HotelsNew;
