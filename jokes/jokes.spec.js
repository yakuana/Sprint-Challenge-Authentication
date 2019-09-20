const request = require('supertest');

const router = require('./jokes-router.js');

describe('jokes-router.js', () => {
  describe('GET /', () => {
    it('returns 200 OK after a GET request ', () => {
      // make a GET request to the / endpoint 
      return request(router)
        .get('/')
        .then(res => {
          // res.status should be 200 
          expect(res.status).toBe(200);
        });
    });

    it('returns JSON', done => {
      request(router)
        .get('/')
        .then(res => {
          // res.statis is 200 and the type of the data is JSON 
          expect(res.type).toMatch(/json/i);
          done();
        });
    });
  });
});
