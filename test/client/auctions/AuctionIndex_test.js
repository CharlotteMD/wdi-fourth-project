/* global describe, it, beforeEach, before, after */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Promise from 'bluebird';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import AuctionsIndex from '../../../src/components/auctions/AuctionsIndex';

const auctionData = [
  {
    'bids': [],
    'hotel': {
      '_id': '5a980b8da7d9ecf50b1da552',
      'name': 'ANdAZ, London Liverpool Street',
      'image': 'https://media-cdn.tripadvisor.com/media/photo-s/12/0f/50/6b/andaz-london-liverpool.jpg',
      'website': 'https://londonliverpoolstreet.andaz.hyatt.com/en/hotel/home.html',
      'location': 'City of London',
      'amenities': 'Spa,Bar,Restaurant,Gym,Airport Shuffle,Free Parking,Free Wifi',
      'stars': 4,
      'admin': '5a980b8da7d9ecf50b1da549',
      '__v': 0
    },
    'reservePrice': 300,
    'checkInDate': '2018-04-08T23:00:00.000Z',
    'nights': 1,
    'maxGuests': 2,
    'board': 'Bed and Breakfast',
    'details': 'Enjoy the night in East London. Stay at the ANdAZ, Liverpool Street and enjoy breakfast included at our Eastway Restaurant.',
    'createdAt': '2018-03-01T14:17:49.788Z',
    'updatedAt': '2018-03-01T14:17:49.788Z',
    'id': '5a980b8da7d9ecf50b1da555'
  },
  {
    'bids': [],
    'hotel': {
      '_id': '5a980b8da7d9ecf50b1da553',
      'name': 'ibis, London City',
      'image': 'https://s-ec.bstatic.com/images/hotel/max1024x768/975/97514031.jpg',
      'website': 'https://exp.cdn-hotels.com/hotels/2000000/1210000/1200100/1200089/1200089_86_z.jpg',
      'location': 'City of London',
      'amenities': 'Free Wifi,Bar,Restaurant',
      'stars': 3,
      'admin': '5a980b8da7d9ecf50b1da54b',
      '__v': 0
    },
    'reservePrice': 50,
    'checkInDate': '2018-01-05T00:00:00.000Z',
    'nights': 2,
    'maxGuests': 3,
    'board': 'Bed only',
    'details': 'Spend a bargain weekend in the City of London at  ibis, London City. Stay with us and see the city',
    'createdAt': '2018-03-01T14:17:49.788Z',
    'updatedAt': '2018-03-01T14:17:49.788Z',
    'id': '5a980b8da7d9ecf50b1da556'
  }
];

describe('Auctions Index tests', () => {
  let wrapper = null;
  let promise = null;

  before(done => {
    promise = Promise.resolve({ data: auctionData });
    sinon.stub(Axios, 'get').returns(promise);
    done();
  });

  after(done => {
    Axios.get.restore();
    done();
  });

  beforeEach(done => {
    wrapper = mount(
      <MemoryRouter>
        <AuctionsIndex />
      </MemoryRouter>
    );

    done();
  });

  it('should display auction', done => {
    promise.then(() => {
      wrapper.update();
      expect(wrapper.find('div.col-sm').length).to.eq(2);
      done();
    });
  });

});
