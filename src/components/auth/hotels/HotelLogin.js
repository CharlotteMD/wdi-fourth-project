import React from 'react';
import Axios from 'axios';

import LoginForm from '../LoginForm';
import Auth from '../../../lib/Auth';

class hotelLogin extends React.Component {

  state = {
    hotel: {
      email: '',
      password: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const hotel = Object.assign({}, this.state.hotel, { [name]: value });
    this.setState({ hotel });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/hotels/login', this.state.hotel)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/auctions');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <LoginForm
        hotel={this.state.hotel}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default hotelLogin;
