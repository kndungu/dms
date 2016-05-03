var app = require('../../app'),
  request = require('supertest'),
  should = require('should');

describe('Users Tests', function() {
  describe('Creates unique user', function() {
    it('does not create user with duplicate username', function(done) {
      request(app)
        .post('/users')
        .send({
          username: 'first',
          firstName: 'Unique',
          lastName: 'Name',
          email: 'unique@name.com',
          role: 'user',
          password: 'testPass'
        })
        .set('Accept', 'application/json')
        .end(function(error, res) {
          should.not.exist(error);
          console.log(res.body);
          should.equal(res.status, 409);
          res.body.success.should.be.false();
          res.body.message.should.containEql('provide another username');
          done();
        });
    });
    it('does not create user with duplicate email', function(done) {
      request(app)
        .post('/users')
        .send({
          username: 'unique',
          firstName: 'First',
          lastName: 'User',
          email: 'first@user.com',
          role: 'user',
          password: 'testPass'
        })
        .set('Accept', 'application/json')
        .end(function(error, res) {
          should.not.exist(error);
          should.equal(res.status, 409);
          res.body.success.should.be.false();
          res.body.message.should.containEql('provide another email');
          done();
        });
    });
  });
  describe('Creates user with a valid role defined', function() {
    it('does not create user without a defined role', function(done) {
      request(app)
        .post('/users')
        .send({
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@user.com',
          password: 'testPass'
        })
        .set('Accept', 'application/json')
        .end(function(error, res) {
          should.not.exist(error);
          should.equal(res.status, 400);
          res.body.success.should.be.false();
          res.body.message.should.containEql('role must be defined');
          done();
        });
    });
    it('does not create user with invalid role', function(done) {
      request(app)
        .post('/users')
        .send({
          username: 'testuser2',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@user2.com',
          role: 'newrole',
          password: 'testPass'
        })
        .set('Accept', 'application/json')
        .end(function(error, res) {
          should.not.exist(error);
          should.equal(res.status, 400);
          res.body.success.should.be.false();
          res.body.message.should.containEql('is an invalid role');
          done();
        });
    });
  });
});
