import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import UserForm from './UserForm';


class UsersEdit extends React.Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  };

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  }

  handleUserChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/users/${this.props.match.params.id}`, this.state.user,
        { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(res => this.props.history.push(`/users/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Edit your profile</h1>
        <UserForm
          history={this.props.history}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleUserChange}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default UsersEdit;
