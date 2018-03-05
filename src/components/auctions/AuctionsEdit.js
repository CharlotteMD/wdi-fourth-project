import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';
import AuctionsForm from './AuctionsForm';


class AuctionsEdit extends React.Component {
  state = {
    auction: {
    },
    hotel: {}
  };

  componentDidMount() {
    Axios
      .get(`/api/auctions/${this.props.match.params.id}`)
      .then(res => this.setState({ auction: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const auction = Object.assign({}, this.state.auction, { [name]: value });
    this.setState({ auction });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/auctions/${this.props.match.params.id}`, this.state.auction,
        { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
      .then(res => this.props.history.push(`/auctions/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <AuctionsForm
          history={this.props.history}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          auction={this.state.auction}
          hotel={this.state.hotel}
        />
        <div>
          <button className="save-button">Save</button>
        </div>
      </div>
    );
  }
}

export default AuctionsEdit;
