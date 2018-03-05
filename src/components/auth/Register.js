import React from 'react';
import Axios from 'axios';

import HotelsForm from '../hotels/HotelsForm';
import UserForm from './UserForm';
import Auth from '../../lib/Auth';

class Register extends React.Component {

  state = {
    user: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: ''
    },
    hotel: {
      name: '',
      image: '',
      website: '',
      location: '',
      info: '',
      amenities: '',
      stars: ''
    },
    showHotelForm: false
  };

  handleUserChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
    console.log('user info: ', user);
  }

  handleHotelChange = ({ target: { name, value }}) => {
    const hotel = Object.assign({}, this.state.hotel, { [name]: value });
    this.setState({ hotel });
    console.log('hotel info: ', hotel);
  }

  toggleHotelForm = (e) => {
    if (e.target.value === 'hotel') {
      this.setState({ showHotelForm: true });
    } else {
      this.setState({ showHotelForm: false });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // if there is hotel form data, first add the user then the hotel
    if (this.state.showHotelForm) {
      Axios
        .post('/api/register', this.state.user)
        .then(res => {
          Auth.setToken(res.data.token);

          Axios
            .post('/api/hotels', this.state.hotel, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
            .then(this.props.history.push('/auctions'));
        });
    } else {
      Axios
        .post('/api/register', this.state.user)
        .then(res => {
          console.log('the response from the api', res);
          Auth.setToken(res.data.token);
          this.props.history.push('/auctions');
        })
        .catch(err => console.log(err));
    }


    // console.log(this.state);
    // Axios.post('/api/register', this.state.user)
    // // 504 error, this isnt returning quick enough
    //   .then(res => {
    //     console.log('the response from the api', res);
    //     Auth.setToken(res.data.token);
    //     Axios.post('/api/hotels/new', this.state.hotel);
    //     this.props.history.push('/');
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <UserForm
          user={this.state.user}
          handleUserChange={this.handleUserChange}
          handleSubmit={this.handleSubmit}
          showHotelForm={this.state.showHotelForm}
        />
        <div className="form-group">
          <select onChange={this.toggleHotelForm} value="">
            <option value="" disabled>Please Select</option>
            <option value="guest">Guest</option>
            <option value="hotel">Hotel</option>
          </select>
        </div>
        { this.state.showHotelForm && <HotelsForm
          user={this.state.user}
          hotel={this.state.hotel}
          handleUserChange={this.handleUserChange}
          handleHotelChange={this.handleHotelChange}
          handleSubmit={this.handleSubmit}
          toggleHotelForm={this.toggleHotelForm}
          showHotelForm={this.state.showHotelForm}
        />}
      </div>
    );
  }
}

export default Register;
