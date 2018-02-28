import React from 'react';
import Axios from 'axios';

import RegisterForm from './RegisterForm';
import Auth from '../../lib/Auth';

class Register extends React.Component {

  state = {
    user: {
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    hotel: {

    },
    showHotelForm: false
  };

  handleUserChange = ({ target: { name, value }}) => {
    console.log('working');
    // this is not working!
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleHotelChange = () => {
    // updating state with hotel inputs.
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
    Axios.post('/api/register', this.state.user)
    // 504 error, this isnt returning quick enough 
      .then(res => {
        console.log('the response from the api', res);
        Auth.setToken(res.data.token);
        Axios.post('/api/hotels/new', this.state.hotel);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <RegisterForm
          user={this.state.user}
          hotel={this.state.hotel}
          handleUserChange={this.handleUserChange}
          handleSubmit={this.handleSubmit}
          toggleHotelForm={this.toggleHotelForm}
          showHotelForm={this.state.showHotelForm}
        />
      </div>
    );
  }
}

export default Register;
