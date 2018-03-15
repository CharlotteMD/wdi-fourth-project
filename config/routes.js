const router = require('express').Router();

const users  = require('../controllers/users');
const hotels  = require('../controllers/hotels');
const auctions  = require('../controllers/auctions');

const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);


router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);


router.route('/hotels/:id')
  .get(hotels.show)
  .put(secureRoute, hotels.update)
  .delete(secureRoute, hotels.delete);

router.route('/hotels')
  .post(secureRoute, hotels.create);


router.route('/auctions')
  .get(auctions.index);

router.route('/auctions/new/:hotelId')
  .post(secureRoute, auctions.create);

router.route('/auctions/:id')
  .get(auctions.show)
  .delete(secureRoute, auctions.delete);

router.route('/auctions/:id/bids')
  .post(secureRoute, auctions.addBid);


router.all('/*', (req, res) => res.notFound());

module.exports = router;
