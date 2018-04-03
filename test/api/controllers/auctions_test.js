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
      Hotel
        .create(testHotel)
        .then(hotel => {
          hotelCreated = hotel;

          return User.create(testUser);
        })
        .then(user => {
          userCreated = user;

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
    });
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

// // SHOW ROUTE
// describe('GET /api/auctions/:id', () => {
//   let hotelCreated = null;
//   let userCreated = null;
//   let auctionCreated = null;
//   let token = null;
//
//   beforeEach(done => {
//     Hotel
//       .create(testHotel)
//       .then(hotel => {
//         hotelCreated = hotel;
//
//         return User.create(testUser);
//       })
//       .then(user => {
//         userCreated = user;
//
//         testAuction.createdBy = user;
//         testAuction.attendees = [user];
//         testAuction.hotel = hotelCreated;
//
//         return Auction.create(testAuction);
//       })
//       .then(auction => {
//         auctionCreated = auction;
//
//         api
//           .post('/api/login')
//           .set('Accept', 'application/json')
//           .send({
//             email: 'patrick@ga.co',
//             password: 'patrick'
//           })
//           .end((err, res) => {
//             token = res.body.token;
//             done();
//           });
//       });
//
//   });
//
//   it('should return a 200 response', done => {
//     api
//       .get(`/api/auctions/${auctionCreated.id}`)
//       .set('Accept', 'application/json')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200, done);
//   });
//
//   it('should return auction data in response body', done => {
//     api
//       .get(`/api/auctions/${auctionCreated.id}`)
//       .set('Accept', 'application/json')
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res.body)
//           .to.be.an('object')
//           .and.have.all.keys([
//             '__v',
//             '_id',
//             'id',
//             'auctionName',
//             'createdBy',
//             'attendees',
//             'dateArrive',
//             'dateDepart',
//             'hotel',
//             'comments'
//           ]);
//
//         done();
//       });
//   });
// });
//
// // UPDATE ROUTE
// describe('PUT /api/auctions/:id', () => {
//   let hotelCreated = null;
//   let userCreated = null;
//   let auctionCreated = null;
//   let token = null;
//
//   beforeEach(done => {
//     Hotel
//       .create(testHotel)
//       .then(hotel => {
//         hotelCreated = hotel;
//
//         return User.create(testUser);
//       })
//       .then(user => {
//         userCreated = user;
//
//         testAuction.createdBy = user;
//         testAuction.attendees = [user];
//         testAuction.hotel = hotelCreated;
//
//         return Auction.create(testAuction);
//       })
//       .then(auction => {
//         auctionCreated = auction;
//
//         api
//           .post('/api/login')
//           .set('Accept', 'application/json')
//           .send({
//             email: 'patrick@ga.co',
//             password: 'patrick'
//           })
//           .end((err, res) => {
//             token = res.body.token;
//             done();
//           });
//       });
//
//   });
//
//   it('should return a 200 response', done => {
//     var updatedAuction = {
//       auctionName: 'Updated',
//       dateArrive: '99 Feb',
//       dateDepart: '99 Feb'
//     };
//
//     api
//       .put(`/api/auctions/${auctionCreated.id}`)
//       .set('Accept', 'application/json')
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedAuction)
//       .expect(200, done);
//   });
//
//   it('should return updated data in body', done => {
//     var updatedAuction = {
//       auctionName: 'Updated',
//       dateArrive: '99 Feb',
//       dateDepart: '99 Feb'
//     };
//
//     api
//       .put(`/api/auctions/${auctionCreated.id}`)
//       .set('Accept', 'application/json')
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedAuction)
//       .end((err, res) => {
//         expect(res.body)
//           .to.be.an('object')
//           .and.to.have.property('auctionName', 'Updated');
//         done();
//       });
//   });
// });
//
// // DELETE ROUTE
// describe('DELETE /api/auctions/:id', () => {
//   let hotelCreated = null;
//   let userCreated = null;
//   let auctionCreated = null;
//   let token = null;
//
//   beforeEach(done => {
//     Hotel
//       .create(testHotel)
//       .then(hotel => {
//         hotelCreated = hotel;
//
//         return User.create(testUser);
//       })
//       .then(user => {
//         userCreated = user;
//
//         testAuction.createdBy = user;
//         testAuction.attendees = [user];
//         testAuction.hotel = hotelCreated;
//
//         return Auction.create(testAuction);
//       })
//       .then(auction => {
//         auctionCreated = auction;
//
//         api
//           .post('/api/login')
//           .set('Accept', 'application/json')
//           .send({
//             email: 'patrick@ga.co',
//             password: 'patrick'
//           })
//           .end((err, res) => {
//             token = res.body.token;
//             done();
//           });
//       });
//
//   });
//
//   it('should return a 204 response', done => {
//     api
//       .delete(`/api/auctions/${auctionCreated.id}`)
//       .set('Accept', 'application/json')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(204, done);
//   });
//
//
//   describe('Auctions Controller Test', () => {
//     describe('GET /api/auctions', () => {
//       it('should return a 200 response', function(done) {
//         api
//           .get('/api/auctions')
//           .set('Accept', 'application/json')
//           .expect(200, done);
//       });
//
//       it('should return an array of auctions', function(done) {
//         api
//           .get('/api/auctions')
//           .set('Accept', 'application/json')
//           .end((err, res) => {
//             expect(res.body).to.be.an('array');
//             done();
//           });
//       });
//     });
//   });
// });
