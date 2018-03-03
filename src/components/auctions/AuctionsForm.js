import React from 'react';

function AuctionsForm({ handleAuctionChange, auction }) {
  return (
    <div className="container">



      {/* Hotel is taken from the url from hotel show */}
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

    </div>
  );
}

export default AuctionsForm;
