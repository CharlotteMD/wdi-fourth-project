const User = require('../models/user');

// function usersIndex(req, res, next) {
//   User
//     .find()
//     .exec()
//     .then(users => res.json(users))
//     .catch(next);
// }

function usersCreate(req, res, next) {

  User
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
}

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate({path: 'bids', model: 'Auction', populate: {path: 'hotel', model: 'Hotel'}})
    .populate('hotels')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

function usersUpdate(req, res, next) {

  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      user = Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function usersDelete(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create: usersCreate,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
