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
          firstname: 'Unique',
          lastname: 'Name',
          email: 'unique@name.com',
          role: 'user',
          password: 'testPass'
        })
        .set('Accept', 'application/json')
        .end(function(error, res) {
          should.not.exist(error);
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
          firstname: 'First',
          lastname: 'User',
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
});
