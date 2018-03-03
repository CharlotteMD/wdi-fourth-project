const mongoose = require('mongoose');

// const bidSchema = new mongoose.Schema({
//   bid: Number,
//   createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
// }, {
//   timestamps: true
// });

const auctionSchema = mongoose.Schema({
  hotel: { type: mongoose.Schema.ObjectId, ref: 'Hotel', required: true },
  reservePrice: Number,
  checkInDate: Date,
  nights: Number,
  maxGuests: Number,
  board: String,
  details: String,
  bids: [ {
    bid: Number,
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  } ]
}, {
  timestamps: true
});

auctionSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

auctionSchema.methods.belongsTo = function auctionBelongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Auction', auctionSchema);
