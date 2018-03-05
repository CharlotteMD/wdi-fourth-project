import React from 'react';
import Axios from 'axios';

import LoginForm from './LoginForm';
import Auth from '../../lib/Auth';

class userLogin extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {}
  };

  handleChange = ({ target: { name, value } }) => {
    console.log('working');
    const user = Object.assign({}, this.state.user, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ user, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/login', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/auctions');
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default userLogin;
