const Promise    = require('bluebird');
const { secret } = require('../config/environment');
const Hotel       = require('../models/hotel');

const jwt = Promise.promisifyAll(require('jsonwebtoken'));

function hotelSecureRoute(req, res, next) {
  if(!req.headers.authorization) return res.unauthorized();

  const token = req.headers.authorization.replace('Bearer ', '');

  jwt
    .verifyAsync(token, secret)
    .then((payload) => {
      return Hotel.findById(payload.hotelId);
    })
    .then((hotel) => {
      if(!hotel) return res.unauthorized();
      req.currentHotel = hotel;
      return next();
    })
    .catch(next);
}

module.exports = hotelSecureRoute;
