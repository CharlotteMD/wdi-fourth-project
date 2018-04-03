/* globals api, expect, describe, it, afterEach, beforeEach */

require('../../spec_helper');

const Auction = require('../../../models/auction');
const Hotel = require('../../../models/hotel');
const User = require('../../../models/user');


const testUser = {
  name: 'Meghan',
  email: 'megz@hotmail.com',
  password: 'password',
  passwordConfirmation: 'password'
};

const testHotel = {
  name: 'The Dorchester Hotel',
  image: 'https://www.dorchestercollection.com/wp-content/uploads/london-the-dorchester-the-promenade-full-room-green-chairs_landscape-1600x900.jpg',
  website: 'https://www.dorchestercollection.com/en/london/the-dorchester/',
  location: 'Mayfair',
  info: 'Discover true luxury at The Dorchester Hotel, one of London\'s most iconic 5-star hotels. Choose from our exquisite range of luxury rooms and suites.',
  amenities: [ 'Spa', 'Concierge', 'Family Friendly', 'Airport Shuffle', 'Free Parking', 'Bar', 'Restaurant' ],
  stars: 5,
  admin: testUser[0]
};

const testAuction = {
  hotel: testHotel[0],
  reservePrice: 500,
  checkInDate: '01/03/2018',
  nights: 1,
  maxGuests: 3,
  board: 'Bed only',
  details: 'We are delighted to be able to offer our honeymoon suite. The offer will include the master bedroom and ajoining leisure rooms.',
  bids: [
    {
      createdBy: testUser[0],
      amount: 600
    }
  ]
};


describe('Auctions Controller Test', () => {

  afterEach(done => {
    Auction.collection.remove();
    User.collection.remove();
    Hotel.collection.remove();
    done();
  });

  //INDEX ROUTE
  describe('GET /api/auctions', () => {
    it('should return a 200 response', done => {
      api
        .get('/api/auctions')
        .set('Accept', 'application/json')
        .expect(200, done);
    });

    it('should return an array of auctions', done => {
      api
        .get('/api/auctions')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // POST ROUTE
  describe('POST /api/auctions', () => {
    let hotelCreated = null;
    let userCreated = null;
    let token = null;

    beforeEach(done => {
      User
        .create(testUser)
        .then(user => {
          userCreated = user;

          // return User.create(testUser);
        });
      Hotel
        .create(testHotel)
        .then(hotel => {
          hotelCreated = hotel;

        });
      api
        .post('/api/login')
        .set('Accept', 'application/json')
        .send({
          email: 'megz@hotmail.com',
          password: 'password'
        })
        .end((err, res) => {

          token = res.body.token;

          done();
        });
    });

    it('should return a 201 response', done => {
      api
        .post('/api/auctions')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          hotel: testHotel[0],
          reservePrice: 500,
          checkInDate: '01/03/2018',
          nights: 1,
          maxGuests: 3,
          board: 'Bed only',
          details: 'We are delighted to be able to offer our honeymoon suite. The offer will include the master bedroom and ajoining leisure rooms.'
        })
        .end((err, res) => {
          expect(res.status).to.eq(201);
          done();
        });

      it('should return created auction data in response body', done => {
        api
          .post('/api/auctions')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            hotel: testHotel[0],
            reservePrice: 500,
            checkInDate: '01/03/2018',
            nights: 1,
            maxGuests: 3,
            board: 'Bed only',
            details: 'We are delighted to be able to offer our honeymoon suite. The offer will include the master bedroom and ajoining leisure rooms.'
          })
          .end((err, res) => {
            expect(res.body)
              .to.be.an('object')
              .and.have.all.keys([
                'hotel',
                'reservePrice',
                'checkInDate',
                'nights',
                'maxGuests',
                'board',
                'details'
              ]);

            done();
          });
      });
    });
  });
});
