const request = require('supertest');

const server = require('../api/server.js');


describe('jokes-router.js using server', () => {
  describe('GET /api/jokes', () => {
    it('no authorization to access jokes (400 error)', () => {
        return request(server).get('/api/jokes')
        .then(response => {
            expect(response.status).toBe(400)
        })
    });

    it('no authorization to access jokes (reponse text)', () => {
        return request(server).get('/api/jokes')
        .then(response => {
            // used \ because it's not being converted to JSON 
            expect(response.text).toBe("{\"message\":\"no credentials provided\"}")
        })
    });
    
  });
});
