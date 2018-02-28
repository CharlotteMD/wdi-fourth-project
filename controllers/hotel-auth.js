const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const Hotel = require('../models/hotel');

function hotelRegister(req, res, next) {
  Hotel
    .create(req.body)
    .then(hotel => {
      const token = jwt.sign({ hotelId: hotel.id }, secret, { expiresIn: '1hr' });

      return res.json({ message: `Welcome ${hotel.hotelName}`, token });
    })
    .catch(next);
}

function hotelLogin(req, res, next) {
  Hotel
    .findOne({ email: req.body.email })
    .then((hotel) => {
      if(!hotel || !hotel.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' });

      const token = jwt.sign({ hotelId: hotel.id }, secret, { expiresIn: '1hr' });
      return res.json({ message: `Welcome back ${hotel.hotelName}`, token });
    })
    .catch(next);
}

module.exports = {
  hotelRegister,
  hotelLogin
};
