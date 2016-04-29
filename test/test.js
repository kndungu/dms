var app = require('../app');
var request = require('supertest');

describe('GET /test', function(){
  it('respond with json', function(done){
    request(app)
      .get('/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
