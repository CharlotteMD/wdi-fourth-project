const router = require('express').Router();

const users  = require('../controllers/users');
const hotels  = require('../controllers/hotels');
const auctions  = require('../controllers/auctions');
const hotelAuth  = require('../controllers/hotel-auth');
const userAuth  = require('../controllers/user-auth');

const userSecureRoute = require('../lib/userSecureRoute');
const hotelSecureRoute = require('../lib/hotelSecureRoute');

router.route('/users/register')
  .post(userAuth.register);

router.route('/users/login')
  .post(userAuth.login);

router.route('/users/:id')
  .get(userSecureRoute, users.show)
  .put(userSecureRoute, users.update)
  .delete(userSecureRoute, users.delete);

router.route('/hotels/register')
  .post(hotelAuth.register);

router.route('/hotels/login')
  .post(hotelAuth.login);

router.route('/hotels/:id')
  .get(hotels.show)
  .put(hotelSecureRoute, hotels.update)
  .delete(hotelSecureRoute, hotels.delete);

// router.route('/auctions/new')
//   .post(hotelSecureRoute, auctions.new); // only hotels can create an auction

router.route('/auctions/:id')
  .get(auctions.show)
  // .put(secureRoute, auctions.update) cant edit an auction once its started
  .delete(hotelSecureRoute, auctions.delete);

// router.route('/auctions/:id/edit')
// .get(secureRoute, auctions.edit); cant edit an auction once its started

router.route('/auctions')
  .get(auctions.index);


// router.route('/auctions/:id/bids/new')
//   .post(userSecureRoute, auctions.new.bids); // only users can bid

// router.route('/auctions/:id/bid/:id')
//   .get(auctions.show.bids); // only user who owns bid can see it, everyone else can only see highest bid
// .get(secureRoute, auctions.edit); cant edit a bid once it has been made
// .delete(secureRoute, auctions.delete); cant delete a bid once its been made

// router.route('/auctions/:id/bid/:id/edit')
//   .get(secureRoute, auctions.edit); bids cant be edited

// router.route('/auctions')
//   .get(auctions.index); can only see the top bid


router.all('/*', (req, res) => res.notFound());

module.exports = router;
