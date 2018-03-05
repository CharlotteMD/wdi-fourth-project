const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { toObject: { virtuals: true } });

userSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    delete json._id;
    delete json.__v;
    delete json.password;
  }
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.virtual('hotels'/* this is the name of the field that we are creating */, {
  ref: 'Hotel', // The model to use, conditional on the doc
  localField: '_id', // Find people or organizations where `localField`
  foreignField: 'admin' // is equal to `foreignField
});

userSchema.virtual('bids'/* this is the name of the field that we are creating */, {
  ref: 'Auction', // The model to use, conditional on the doc
  localField: '_id', // Find people or organizations where `localField`
  foreignField: 'bids.createdBy' // is equal to `foreignField`
});

userSchema.pre('validate', function checkPassword(next) {
  if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
