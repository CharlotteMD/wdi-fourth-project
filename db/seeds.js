const mongoose   = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const Hotel = require('../models/hotel');
const Auction = require('../models/auction');


Hotel.collection.drop();
User.collection.drop();
Auction.collection.drop();

let globalUserData = null;

const userData = [{
  name: 'Meghan',
  email: 'megz@hotmail.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Ameelah',
  email: 'meela@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Callie',
  email: 'callie@hotmail.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Kate',
  email: 'kate@btinternet.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Sunshine',
  email: 'liu.sun@yahoo.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Shawn',
  email: 'shawn@yahoo.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Kelly',
  email: 'kelz@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Lucy',
  email: 'lucy@hotmail.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Hussein',
  email: 'h.akhtar@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  name: 'Alfred',
  email: 'alf@ga.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

const hotelData =[{
  hotelName: 'The Dorchester Hotel',
  contactEmail: 'hello@thedorchester.com',
  hotelPassword: 'password',
  image: 'https://exquisiteconcierge.co.uk/wp-content/uploads/2016/12/MG_6244-1.jpg',
  website: 'https://www.dorchestercollection.com/en/london/the-dorchester/',
  location: 'Mayfair',
  amenities: [ 'Spa', 'Concierge', 'Family Friendly', 'Airport Shuffle', 'Free Parking', 'Bar', 'Restaurant' ],
  stars: 5
},{
  hotelName: 'ANdAZ, London Liverpool Street',
  contactEmail: 'hello@hyatt.com',
  hotelPassword: 'password',
  image: 'https://exp.cdn-hotels.com/hotels/1000000/440000/431700/431650/707396a1_z.jpg',
  website: 'https://londonliverpoolstreet.andaz.hyatt.com/en/hotel/home.html',
  location: 'City of London',
  amenities: [ 'Spa', 'Bar', 'Restaurant', 'Gym', 'Airport Shuffle', 'Free Parking', 'Free Wifi' ],
  stars: 4
},{
  hotelName: 'ibis, London City',
  contactEmail: 'hello@accor.com',
  hotelPassword: 'password',
  image: 'https://exp.cdn-hotels.com/hotels/1000000/440000/431700/431650/707396a1_z.jpg',
  website: 'https://exp.cdn-hotels.com/hotels/2000000/1210000/1200100/1200089/1200089_86_z.jpg',
  location: 'City of London',
  amenities: [ 'Free Wifi', 'Bar', 'Restaurant' ],
  stars: 3
}];


User
  .create(userData)
  .then(users => {
    globalUserData = users;
    console.log(`${users.length} users created! 👨‍👩‍👧‍👦`);
    return Hotel.create(hotelData);
  })
  .then(hotels => {
    console.log(`${hotels.length} hotel created! 🏩`);
    return Auction.create([
      {
        hotel: hotels[0],
        reservePrice: 500,
        checkInDate: '01/03/2018',
        nights: 1,
        maxGuests: 3,
        board: 'Bed only',
        details: 'We are delighted to be able to offer our honeymoon suite. The offer will include the master bedroom and ajoining leisure rooms.',
        bid:
        [
          {
            createdBy: globalUserData[0],
            bid: 600
          },{
            createdBy: globalUserData[3],
            bid: 670
          },{
            createdBy: globalUserData[9],
            bid: 700
          }
        ]
      },{
        hotel: hotels[1],
        reservePrice: 300,
        checkInDate: '09/04/2018',
        nights: 1,
        maxGuests: 2,
        board: 'Bed and Breakfast',
        details: 'Enjoy the night in East London. Stay at the ANdAZ, Liverpool Street and enjoy breakfast included at our Eastway Restaurant.',
        bid:
        [
          {
            createdBy: globalUserData[2],
            bid: 400
          },{
            createdBy: globalUserData[7],
            bid: 450
          },{
            createdBy: globalUserData[1],
            bid: 495
          },{
            createdBy: globalUserData[5],
            bid: 500
          }
        ]
      },{
        hotel: hotels[2],
        reservePrice: 50,
        checkInDate: '21/05/2018',
        nights: 2,
        maxGuests: 3,
        board: 'Bed only',
        details: 'Spend a bargain weekend in the City of London at ibis, London City. Stay with us and see the city',
        bid:
        [
          {
            createdBy: globalUserData[4],
            bid: 50
          },{
            createdBy: globalUserData[9],
            bid: 55
          },{
            createdBy: globalUserData[8],
            bid: 90
          },{
            createdBy: globalUserData[7],
            bid: 100
          },{
            createdBy: globalUserData[6],
            bid: 125
          },{
            createdBy: globalUserData[1],
            bid: 140
          }
        ]
      },
    ]);
  })
  .then(auctions => {
    console.log(`${auctions.length} auctions created 💷`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
