// /* global describe, it */
// import React from 'react';
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
// import User from '../../models/user';
//
//
// // REGISTER ROUTE
// describe('User Registration Tests', () => {
//   it('should register a user providing the correct credentials', done => {
//
//
//   //   api
//   //   .post('/api/register')
//   //   .set('Accept', 'application/json')
//   //   .send({
//   //     name: 'Development',
//   //     email: 'hey@test.com',
//   //     password: 'password',
//   //     passwordConfirmation: 'password'
//   //   })
//   //   .end((err, res) => {
//   //     expect(res.status).to.eq(200);
//   //     expect(res.body).to.be.a('object');
//   //     expect(res.body.message).to.eq(`Welcome ${res.body.user.name}`);
//   //     expect(res.body.token).to.be.a('string');
//   //     done();
//   //   });
//   // });
//
//   it('should not register a user if password and passwordConfirmation do not match', done => {
//     api
//     .post('/api/register')
//     .set('Accept', 'application/json')
//     .send({
//       name: 'Development',
//       email: 'hey@test.com',
//       password: 'password',
//       passwordConfirmation: 'forgot'
//     })
//     .end((err, res) => {
//       expect(res.status).to.eq(400);
//       expect(res.body).to.be.a('object');
//       expect(res.body.message).to.eq('Bad Request');
//       expect(res.body.errors).to.eq('ValidationError: passwordConfirmation: does not match');
//       done();
//     });
//   });
// });
//
//
//
// // LOGIN ROUTE
// describe('POST /api/login', () => {
//   beforeEach(done => {
//     api
//     .post('/api/register')
//     .set('Accept', 'application/json')
//     .send({
//       name: 'Development',
//       email: 'hey@test.com',
//       password: 'password',
//       passwordConfirmation: 'password'
//     })
//     .end(() => {
//       done();
//     });
//   });
//
//   afterEach(done => {
//     User.collection.remove();
//     done();
//   });
//
//   it('should login a user with the correct credentials', done => {
//     api
//     .post('/api/login')
//     .set('Accept', 'application/json')
//     .send({
//       email: 'hey@test.com',
//       password: 'password'
//     })
//     .end((err, res) => {
//       expect(res.status).to.eq(200);
//       expect(res.body).to.be.a('object');
//       expect(res.body.message).to.eq('Welcome back Development');
//       expect(res.body.token).to.be.a('string');
//       done();
//     });
//   });
//
//   it('should not login a user with incorrect credentials', function(done) {
//     api
//     .post('/api/login')
//     .set('Accept', 'application/json')
//     .send({
//       email: 'hey@test.com',
//       password: 'forgot'
//     })
//     .end((err, res) => {
//       expect(res.status).to.eq(401);
//       expect(res.body).to.be.a('object');
//       expect(res.body.message).to.eq('Unauthorized');
//       expect(Object.keys(res.body)).to.not.include('token');
//       done();
//     });
//   });
//
//
//
// });
