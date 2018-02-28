const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  website: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  amenities: { type: String },
  admin: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  stars: Number
});

// hotelSchema.set('toJSON', {
//   getters: true,
//   virtuals: true,
//   transform(obj, json) {
//     delete json._id;
//     delete json.__v;
//     delete json.password;
//   }
// });

// hotelSchema
//   .virtual('passwordConfirmation')
//   .set(function setPasswordConfirmation(passwordConfirmation) {
//     this._passwordConfirmation = passwordConfirmation;
//   });
//
// hotelSchema.pre('validate', function checkPassword(next) {
//   if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
//     this.invalidate('passwordConfirmation', 'Passwords do not match');
//   }
//   next();
// });
//
// hotelSchema.pre('save', function hashPassword(next) {
//   if(this.isModified('password')) {
//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
//   }
//   next();
// });
//
// hotelSchema.methods.validatePassword = function validatePassword(password) {
//   return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('Hotel', hotelSchema);
