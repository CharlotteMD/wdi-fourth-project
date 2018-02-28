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
      .then(res => {
        console.log('the response from the api', res);
        Auth.setToken(res.data.token);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <RegisterForm
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        toggleHotelForm={this.toggleHotelForm}
        showHotelForm={this.state.showHotelForm}
      />
    );
  }
}

export default Register;
