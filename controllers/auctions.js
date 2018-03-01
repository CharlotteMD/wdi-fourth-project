const Auction = require('../models/auction');

function auctionsIndex(req, res, next) {
  Auction
    .find()
    .populate('hotel')
    .exec()
    .then(auctions => res.json(auctions))
    .catch(next);
}

function auctionsCreate(req, res, next) {

  // if(req.file) req.body.image = req.file.filename;

  Auction
    .create(req.body)
    .then(auction => res.status(201).json(auction))
    .catch(next);
}

function auctionsShow(req, res, next) {
  Auction
    .findById(req.params.id)
    .populate('hotel')
    .exec()
    .then((auction) => {
      if(!auction) return res.notFound();
      res.json(auction);
    })
    .catch(next);
}

// function auctionsUpdate(req, res, next) {
//
//   // if(req.file) req.body.image = req.file.filename;
//
//   Auction
//     .findById(req.params.id)
//     .exec()
//     .then((auction) => {
//       if(!auction) return res.notFound();
//       auction = Object.assign(auction, req.body);
//       return auction.save();
//     })
//     .then(auction => res.json(auction))
//     .catch(next);
// }

function auctionsDelete(req, res, next) {
  Auction
    .findById(req.params.id)
    .exec()
    .then((auction) => {
      if(!auction) return res.notFound();
      return auction.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: auctionsIndex,
  create: auctionsCreate,
  show: auctionsShow,
  delete: auctionsDelete
};
