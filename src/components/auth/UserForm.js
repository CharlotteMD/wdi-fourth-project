import React from 'react';


const UserForm = ({ handleUserChange, handleSubmit, user }) => {
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

      </form>
    </div>
  );
};

export default UserForm;