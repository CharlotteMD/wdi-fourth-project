const Auction = require('../models/auctions');


function bidsCreate(req, res, next) {
  req.body.createdBy = req.currentUser;


  Auction
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
}

function bidsShow(req, res, next) {
  Auction
    .findById(req.params.id)
    .populate('hotel')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}


module.exports = {
  create: bidsCreate,
  show: bidsShow
};
