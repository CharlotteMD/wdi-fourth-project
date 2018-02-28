import React from 'react';

const RegisterForm = ({ handleUserChange, handleHotelChange, handleSubmit, user, toggleHotelForm, showHotelForm, hotel }) => {
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



            {/* Need to add admin from user created */}

            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Hotel Name"
                onChange={handleHotelChange}
                value={hotel.name}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="image"
                placeholder="Input image url"
                onChange={handleHotelChange}
                value={hotel.image}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="website"
                placeholder="Hotel Website"
                onChange={handleHotelChange}
                value={hotel.website}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <select
                className="form-control"
                id="location"
                name="location"
                value={hotel.location}
                onChange={handleHotelChange}
              >
                <option value="" disabled>Please Select</option>
                <option>Camden</option>
                <option>Greenwich</option>
                <option>Hackney</option>
                <option>Hammersmith and Fulham</option>
                <option>Islington</option>
                <option>Kensington and Chelsea</option>
                <option>Lambeth</option>
                <option>Lewisham</option>
                <option>Southwark</option>
                <option>Tower Hamlets</option>
                <option>Wandsworth</option>
                <option>Westminster</option>
                <option>Greater London - North</option>
                <option>Greater London - East</option>
                <option>Greater London - South</option>
                <option>Greater London - West</option>

              </select>
            </div>

            <div className="form-group">
              <label htmlFor="amenities">Amenities</label>
              <select
                className="form-control"
                id="amenities"
                name="amenities"
                value={hotel.amenities}
                onChange={handleHotelChange}
              >
                <option value="" disabled>Please Select</option>
                <option>Non-smoking rooms</option>
                <option>Free Wifi</option>
                <option>Parking</option>
                <option>Airport Shuffle</option>
                <option>Pets Allowed</option>
                <option>Restaurant</option>
                <option>Bar</option>
                <option>Gym</option>
                <option>Facilities for Diabled Guests</option>
                <option>Room Service</option>
                <option>Family Friendly</option>
                <option>Spa</option>
                <option>Swimming Pool</option>

              </select>
            </div>

            <div className="form-group">
              <label htmlFor="stars">Star Rating</label>
              <select
                className="form-control"
                id="stars"
                name="stars"
                value={hotel.stars}
                onChange={handleHotelChange}
              >
                <option value="" disabled>Please Select</option>
                <option value="1">⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
              </select>
            </div>

          </div>}

        <button className="main-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
