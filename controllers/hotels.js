const Hotel = require('../models/hotel');

function hotelsIndex(req, res, next) {
  Hotel
    .find()
    .exec()
    .then(hotels => res.json(hotels))
    .catch(next);
}

function hotelsCreate(req, res, next) {
  req.body.admin = req.currentUser;

  Hotel
    .create(req.body)
    .then(hotel => res.status(201).json(hotel))
    .catch(next);
}

function hotelsShow(req, res, next) {
  Hotel
    .findById(req.params.id)
    .exec()
    .then((hotel) => {
      if(!hotel) return res.notFound();
      res.json(hotel);
    })
    .catch(next);
}

function hotelsUpdate(req, res, next) {

  if(req.file) req.body.image = req.file.filename;

  Hotel
    .findById(req.params.id)
    .exec()
    .then((hotel) => {
      if(!hotel) return res.notFound();
      hotel = Object.assign(hotel, req.body);
      return hotel.save();
    })
    .then(hotel => res.json(hotel))
    .catch(next);
}

function hotelsDelete(req, res, next) {
  Hotel
    .findById(req.params.id)
    .exec()
    .then((hotel) => {
      if(!hotel) return res.notFound();
      return hotel.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create: hotelsCreate,
  show: hotelsShow,
  update: hotelsUpdate,
  delete: hotelsDelete
};
