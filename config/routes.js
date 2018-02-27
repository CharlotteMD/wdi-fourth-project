const router = require('express').Router();

const users  = require('../controllers/users');
const hotels  = require('../controllers/hotels');
const auctions  = require('../controllers/auctions');
const auth  = require('../controllers/auth');

const userSecureRoute = require('../lib/userSecureRoute');
const hotelSecureRoute = require('../lib/hotelSecureRoute');

router.route('/users/register')
  .post(auth.register);

router.route('/users/login')
  .post(auth.login);

router.route('/users/:id')
  .get(userSecureRoute, users.show)
  .put(userSecureRoute, users.update)
  .delete(userSecureRoute, users.delete);

router.route('/users/:id/edit')
  .get(userSecureRoute, users.edit);


router.route('/hotels/register')
  .post(auth.register);

router.route('/hotels/login')
  .post(auth.login);

router.route('/hotels/:id')
  .get(hotels.show)
  .put(hotelSecureRoute, hotels.update)
  .delete(hotelSecureRoute, hotels.delete);

router.route('/hotels/:id/edit')
  .get(hotelSecureRoute, hotels.edit);


router.route('/auctions/new')
  .post(hotelSecureRoute, auctions.new); // only hotels can create an auction

router.route('/auctions/:id')
  .get(auctions.show)
  // .put(secureRoute, auctions.update) cant edit an auction once its started
  .delete(hotelSecureRoute, auctions.delete);

// router.route('/auctions/:id/edit')
// .get(secureRoute, auctions.edit); cant edit an auction once its started

router.route('/auctions')
  .get(auctions.index);


router.route('/auctions/:id/bids/new')
  .post(userSecureRoute, auctions.new.bids); // only users can bid

router.route('/auctions/:id/bid/:id')
  .get(auctions.show.bids); // only user who owns bid can see it, everyone else can only see highest bid
// .get(secureRoute, auctions.edit); cant edit a bid once it has been made
// .delete(secureRoute, auctions.delete); cant delete a bid once its been made

// router.route('/auctions/:id/bid/:id/edit')
//   .get(secureRoute, auctions.edit); bids cant be edited

// router.route('/auctions')
//   .get(auctions.index); can only see the top bid


router.all('/*', (req, res) => res.notFound());

module.exports = router;
