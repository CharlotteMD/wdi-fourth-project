import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, user, errors }) => {
  const formIsInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <div className="container">
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
          { errors.email && <p>{errors.email}</p>}
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
          { errors.password && <p>{errors.password}</p>}
        </div>

        <button disabled={formIsInvalid} className="main-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
