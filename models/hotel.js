const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  website: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  amenities: [{ type: String }],
  info: { type: String, required: true },
  admin: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  stars: Number
});

hotelSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
  }
});

hotelSchema.virtual('auctions'/* this is the name of the field that we are creating */, {
  ref: 'Auction', // The model to use, conditional on the doc
  localField: '_id', // Find people or organizations where `localField`
  foreignField: 'hotel' // is equal to `foreignField
});

module.exports = mongoose.model('Hotel', hotelSchema);
