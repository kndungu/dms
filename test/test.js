var app = require('../app');
var request = require('supertest');
var should = require('should');
var Test = require('../server/models/test');

describe('Users Tests', function() {
  // Remove all entries currently in the collection
  // before(function(done) {
  //   Test.remove({},function(error, removed) {
  //     done();
  //   });
  // });
  describe('GET /test', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/test')
        .set('Accept', 'application/json')
        .end(function(error, res) {
          should.not.exist(error);
          res.should.be.an.Object;
          done();
        });
    });
    describe('create test user', function() {
      it('returns the newly created user', function(done) {
        request(app)
          .post('/test')
          .send({
            email: 'supertest203@test.com',
            username: 'supertest203',
            firstName: 'Super',
            lastName: 'Test',
            password: 'supertest',
            role: 'user'
          })
          .set('Accept', 'application/json')
          .end(function(error, res) {
            should.not.exist(error);
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            done();
          });
      });
    });
  });
});
