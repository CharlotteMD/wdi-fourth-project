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

router.route('/hotels/new')
  .post(secureRoute, hotels.create);

router.route('/auctions')
  .get(auctions.index);

router.route('/auctions/new')
  .post(secureRoute, auctions.create);

router.route('/auctions/:id')
  .get(auctions.show)
  .delete(secureRoute, auctions.delete);

router.route('/auctions/:id/bids')
  .post(secureRoute, auctions.addBid);




// router.route('/auctions/:id/edit')
// .get(secureRoute, auctions.edit); cant edit an auction once its started



// router.route('/auctions/:id/bids/new')
//   .post(secureRoute, auctions.new.bids); // only users can bid

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
