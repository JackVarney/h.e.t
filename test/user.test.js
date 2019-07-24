const chai = require('chai');
const request = require('supertest');
const app = require('../src/express');

const expect = chai.expect;
const { get, put, post, del } = request(app);
const mapBody = req => req.body;

describe('User', () => {
  describe('GET', () => {
    it('should get a user', () =>
      get('/user/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(mapBody)
        .then(body => {
          expect(body).to.have.keys([
            'id',
            'created',
            'familyName',
            'givenName',
            'email'
          ]);
        }));

    it('should not get a user', () =>
      get('/user/2')
        .expect('Content-Type', /json/)
        .expect(404)
        .then(mapBody)
        .then(body => {
          expect(body.title).to.equal('Invalid ID');
          expect(body.message).to.equal('No user with that ID found');
        }));
  });

  describe('POST', () => {
    it('should create a new user', () =>
      post('/user')
        .send({
          email: 'email@emaily.com',
          givenName: 'Name',
          familyName: 'Name'
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(mapBody)
        .then(body => {
          expect(body).to.have.keys([
            'id',
            'created',
            'familyName',
            'givenName',
            'email'
          ]);
        }));

    it('should fail to create a user with an invalid email address', () =>
      post('/user')
        .send({
          email: 'not a valid email address',
          givenName: 'Name',
          familyName: 'Name'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(mapBody)
        .then(body => {
          expect(body).to.have.keys(['title', 'message']);
        }));

    it('should fail to create a user with an given name', () =>
      post('/user')
        .send({
          email: 'not a valid email address',
          givenName: 123,
          familyName: 'Name'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(mapBody)
        .then(body => {
          expect(body).to.have.keys(['title', 'message']);
        }));

    it('should fail to create a user with an family name', () =>
      post('/user')
        .send({
          email: 'not a valid email address',
          givenName: 'Name',
          familyName: 123
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(mapBody)
        .then(body => {
          expect(body).to.have.keys(['title', 'message']);
        }));

    it('should fail to create with an invalid property', () =>
      post('/user')
        .send({
          id: '3',
          email: 'not a valid email address',
          givenName: 'Name',
          familyName: 123
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then(mapBody)
        .then(body => {
          expect(body).to.have.keys(['title', 'message']);
        }));
  });

  describe('PUT', () => {
    it('should update to a user', () =>
      put('/user/2')
        .send({
          email: 'newEmail@email.com',
          givenName: 'new given name',
          familyName: 'new family name'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(mapBody)
        .then(body => {
          expect(body.email).to.equal('newEmail@email.com');
          expect(body.givenName).to.equal('new given name');
          expect(body.familyName).to.equal('new family name');
        }));

    it('should fail to update an invalid property', () =>
      put('/user/2')
        .send({
          id: 'new family name'
        })
        .expect('Content-Type', /json/)
        .expect(400));
  });

  describe('DEL', () => {
    it('should delete a user', () =>
      del('/user/2')
        .expect('Content-Type', /json/)
        .expect(200));

    it('should fail to delete a user with an invalid id', () =>
      del('/user/notavalidid')
        .expect('Content-Type', /json/)
        .expect(409));
  });
});
