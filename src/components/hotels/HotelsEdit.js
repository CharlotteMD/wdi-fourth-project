import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import HotelsForm from './HotelsForm';


class HotelsEdit extends React.Component {
  state = {
    hotel: {
    }
  };

  componentDidMount() {
    Axios
      .get(`/api/hotels/${this.props.match.params.id}`)
      .then(res => this.setState({ hotel: res.data }))
      .catch(err => console.log(err));
  }

  handleHotelChange = ({ target: { name, value } }) => {
    const hotel = Object.assign({}, this.state.hotel, { [name]: value });
    this.setState({ hotel });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/hotels/${this.props.match.params.id}`, this.state.hotel,
        { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(res => this.props.history.push(`/hotels/${res.data.id}`))
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

export default HotelsEdit;
