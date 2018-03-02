import React from 'react';
import Axios from 'axios';

import HotelsForm from './HotelsForm';
import Auth from '../../lib/Auth';

class HotelsNew extends React.Component {
  state = {
    hotel: {
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const hotel = Object.assign({}, this.state.hotel, { [name]: value });
    this.setState({ hotel });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/hotels', this.state.hotel, { headers: { 'Authorization': `Bearer ${Auth.getToken()}`} })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <HotelsForm
          history={this.props.history}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          hotel={this.state.hotel}
        />
        <button className="main-button">Create</button>
      </div>
    );
  }
}

export default HotelsNew;
