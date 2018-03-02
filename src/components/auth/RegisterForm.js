import React from 'react';

import HotelsForm from '../hotels/HotelsForm';


const RegisterForm = ({ handleUserChange, handleSubmit, user, toggleHotelForm, showHotelForm }) => {
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleUserChange}
            value={user.email}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleUserChange}
            value={user.name}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleUserChange}
            value={user.password}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            onChange={handleUserChange}
            value={user.passwordConfirmation}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <select onChange={toggleHotelForm} value="">
            <option value="" disabled>Please Select</option>
            <option value="guest">Guest</option>
            <option value="hotel">Hotel</option>
          </select>
        </div>

        { showHotelForm &&
          <div>

            <HotelsForm
              history={this.props.history}
              handleHotelSubmit={this.handleHotelSubmit}
              handleHotelChange={this.handleHotelChange}
              hotel={this.state.hotel}
            />
            {/* Need to add admin from user created */}


          </div>}

        <button className="main-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
