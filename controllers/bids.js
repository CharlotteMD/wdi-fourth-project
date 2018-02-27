const Auction = require('../models/auctions');

// function bidsIndex(req, res, next) {
//   Auction
//     .find()
//     .exec()
//     .then(bids => res.json(bids))
//     .catch(next);
// }

function bidsCreate(req, res, next) {

  // if(req.file) req.body.image = req.file.filename;

  Auction
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
}

function bidsShow(req, res, next) {
  Auction
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

// function bidsUpdate(req, res, next) {
//
//   // if(req.file) req.body.image = req.file.filename;
//
//   Auction
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) return res.notFound();
//       user = Object.assign(user, req.body);
//       return user.save();
//     })
//     .then(user => res.json(user))
//     .catch(next);
// }

// function bidsDelete(req, res, next) {
//   Auction
//     .findById(req.params.id)
//     .exec()
//     .then((user) => {
//       if(!user) return res.notFound();
//       return user.remove();
//     })
//     .then(() => res.status(204).end())
//     .catch(next);
// }

module.exports = {
  create: bidsCreate,
  show: bidsShow
};
