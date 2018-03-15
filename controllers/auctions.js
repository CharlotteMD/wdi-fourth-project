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
  req.body.hotel = req.params.hotelId;

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

function addBid(req, res, next) {
  req.body.createdBy = req.currentUser.id;

  Auction
    .findById(req.params.id)
    .exec()
    .then(auction => {
      if(!auction) return res.notFound();

      auction.bids.push(req.body);
      return auction.save();
    })
    .then(auction => {
      return res.status(200).json(auction);
    })
    .catch(next);
}

module.exports = {
  index: auctionsIndex,
  create: auctionsCreate,
  show: auctionsShow,
  delete: auctionsDelete,
  addBid: addBid
};
