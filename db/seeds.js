const mongoose   = require('mongoose');
const { db, env } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(db[env]);

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

User
  .create(userData)
  .then(users => {
    globalUserData = users;
    console.log(`${users.length} users created! 👨‍👩‍👧‍👦`);
    return Hotel.create([
      {
        name: 'The Dorchester Hotel',
        image: 'https://www.dorchestercollection.com/wp-content/uploads/london-the-dorchester-the-promenade-full-room-green-chairs_landscape-1600x900.jpg',
        website: 'https://www.dorchestercollection.com/en/london/the-dorchester/',
        location: 'Mayfair',
        info: 'Discover true luxury at The Dorchester Hotel, one of London\'s most iconic 5-star hotels. Choose from our exquisite range of luxury rooms and suites.',
        amenities: [ 'Spa', 'Concierge', 'Family Friendly', 'Airport Shuffle', 'Free Parking', 'Bar', 'Restaurant' ],
        stars: 5,
        admin: globalUserData[6]
      },{
        name: 'ANdAZ, London Liverpool Street',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/12/0f/50/6b/andaz-london-liverpool.jpg',
        website: 'https://londonliverpoolstreet.andaz.hyatt.com/en/hotel/home.html',
        location: 'City of London',
        info: 'Located in the heart of vibrant East London, Andaz London Liverpool Street hotel lends itself as the perfect location for leisure and business guests alike. Opened as the Great Eastern Hotel in 1884 and one of London’s original railway hotels, the Andaz is housed in a beautiful redbrick Victorian building designed by the architects of London’s famed Houses of Parliament.',
        amenities: [ 'Spa', 'Bar', 'Restaurant', 'Gym', 'Airport Shuffle', 'Free Parking', 'Free Wifi' ],
        stars: 4,
        admin: globalUserData[2]
      },{
        name: 'ibis, London City',
        image: 'https://s-ec.bstatic.com/images/hotel/max1024x768/975/97514031.jpg',
        website: 'https://exp.cdn-hotels.com/hotels/2000000/1210000/1200100/1200089/1200089_86_z.jpg',
        location: 'City of London',
        info: 'Just 20 yards from Aldgate East London Underground Station, ibis London City - Shoreditch has modern, air-cooled rooms. Liverpool Street Station is a 10-minute walk away.In the heart of The City, the ibis London City - Shoreditch is a 15-minute walk from St Paul’s Cathedral. Vibrant South Bank, with Tate Modern and Shakespeare’s Globe, is a 20-minute walk away.',
        amenities: [ 'Free Wifi', 'Bar', 'Restaurant' ],
        stars: 3,
        admin: globalUserData[4]
      }
    ]);
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
        checkInDate: '04/09/2018',
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
        checkInDate: '01/05/2018',
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
      }
    ]);
  })
  .then(auctions => {
    console.log(`${auctions.length} auctions created 💷`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
