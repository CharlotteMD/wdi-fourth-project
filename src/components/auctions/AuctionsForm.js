import React from 'react';

const AuctionsForm = ({ handleAuctionChange, handleSubmit, auction, errors }) => {

  const formIsInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="reservePrice">Reserve Price</label>
          <input
            type="number"
            name="reservePrice"
            placeholder="Reserve Price"
            onChange={handleAuctionChange}
            value={auction.reservePrice}
            className="form-control"
          />
        </div>
        { errors.reservePrice && <p>{errors.reservePrice}</p>}

        <div className="form-group">
          <label htmlFor="checkInDate">Check in Date</label>
          <input
            type="date"
            name="checkInDate"
            placeholder="Check in Date"
            onChange={handleAuctionChange}
            value={auction.checkInDate}
            className="form-control"
          />
        </div>
        { errors.checkInDate && <p>{errors.checkInDate}</p>}

        <div className="form-group">
          <label htmlFor="nights">Number of nights</label>
          <input
            type="number"
            name="nights"
            placeholder="Number of nights"
            onChange={handleAuctionChange}
            value={auction.nights}
            className="form-control"
          />
        </div>
        { errors.nights && <p>{errors.nights}</p>}

        <div className="form-group">
          <label htmlFor="maxGuests">Max number of guests</label>
          <input
            type="number"
            name="maxGuests"
            placeholder="Max number of guests"
            onChange={handleAuctionChange}
            value={auction.maxGuests}
            className="form-control"
          />
        </div>
        { errors.maxGuests && <p>{errors.maxGuests}</p>}

        <div className="form-group">
          <label htmlFor="board">Board Type</label>
          <select
            className="form-control"
            id="board"
            name="board"
            value={auction.board}
            onChange={handleAuctionChange}
          >
            <option value="" disabled>Please Select</option>
            <option>Bed only</option>
            <option>Bed & Breakfast</option>
            <option>Dinner, Bed & Breakfast</option>
            <option>All Inclusive</option>

          </select>
        </div>
        { errors.board && <p>{errors.board}</p>}

        <div className="form-group">
          <label htmlFor="details">Details of your auction</label>
          <input
            type="text"
            name="details"
            placeholder="Details of your auction"
            onChange={handleAuctionChange}
            value={auction.details}
            className="form-control"
          />
        </div>
        { errors.details && <p>{errors.details}</p>}

        <button disabled={formIsInvalid} className="main-button">Create</button>
      </form>
    </div>
  );
};

export default AuctionsForm;
