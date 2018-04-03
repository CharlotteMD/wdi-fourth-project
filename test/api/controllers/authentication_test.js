// /* globals api, expect, describe, it, afterEach, beforeEach */
// require('../../spec_helper');
//
// const User = require('../../../models/user');
//
//
// describe('Authentication Controller Tests', () => {
//
//   afterEach(done => {
//     User.collection.remove();
//     done();
//   });
//
//   // REGISTER ROUTE
//   describe('POST /api/register', () => {
//     it('should register a user providing the correct credentials', done => {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           name: 'Javed',
//           email: 'hey@javed.com',
//           password: 'password',
//           passwordConfirmation: 'password'
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(200);
//           expect(res.body).to.be.a('object');
//           expect(res.body.message).to.eq(`Welcome ${res.body.user.name}`);
//           expect(res.body.token).to.be.a('string');
//           done();
//         });
//     });
//
//     it('should not register a user if password and passwordConfirmation do not match', done => {
//       api
//         .post('/api/register')
//         .set('Accept', 'application/json')
//         .send({
//           name: 'Char',
//           email: 'hello@char.com',
//           password: 'password',
//           passwordConfirmation: 'forgot'
//         })
//         .end((err, res) => {
//           expect(res.status).to.eq(422);
//           expect(res.body).to.be.a('object');
//           expect(res.body.message).to.eq('Unprocessable Entity');
//           expect(res.body.errors).to.eq('errors: passwordConfirmation: passwords do not match');
//           done();
//         });
//     });
//   });
//
// });
//
// // LOGIN ROUTE
// describe('POST /api/login', () => {
//   beforeEach(done => {
//     api
//       .post('/api/register')
//       .set('Accept', 'application/json')
//       .send({
//         name: 'Katie',
//         email: 'hey@katie.com',
//         password: 'password',
//         passwordConfirmation: 'password'
//       })
//       .end(() => {
//         done();
//       });
//   });
//
//   afterEach(done => {
//     User.collection.remove();
//     done();
//   });
//
//   it('should login a user with the correct credentials', done => {
//     api
//       .post('/api/login')
//       .set('Accept', 'application/json')
//       .send({
//         email: 'hey@katie.com',
//         password: 'password'
//       })
//       .end((err, res) => {
//         expect(res.status).to.eq(200);
//         expect(res.body).to.be.a('object');
//         expect(res.body.message).to.eq('Welcome back Katie');
//         expect(res.body.token).to.be.a('string');
//         done();
//       });
//   });
//
//   it('should not login a user with incorrect credentials', function(done) {
//     api
//       .post('/api/login')
//       .set('Accept', 'application/json')
//       .send({
//         email: 'hey@katie.com',
//         password: 'forgot'
//       })
//       .end((err, res) => {
//         expect(res.status).to.eq(401);
//         expect(res.body).to.be.a('object');
//         expect(res.body.message).to.eq('Unauthorized');
//         expect(Object.keys(res.body)).to.not.include('token');
//         done();
//       });
//   });
//
//
//
// });
