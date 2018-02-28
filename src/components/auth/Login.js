import React from 'react';
import Axios from 'axios';

import LoginForm from './LoginForm';
import Auth from '../../lib/Auth';

class userLogin extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    console.log('working');
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/users/login', this.state.user)
      .then(res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/auctions');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default userLogin;
