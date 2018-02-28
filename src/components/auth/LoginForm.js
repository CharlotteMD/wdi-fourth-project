import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, user }) => { // how can i make the same form use either hotel or user details?
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          className="form-control"
        />
      </div>
      <button className="main-button">Login</button>
    </form>
  );
};

export default LoginForm;
