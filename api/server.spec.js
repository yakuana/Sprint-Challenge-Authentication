const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    describe('GET /', () => {
        it('returns 200 OK', () => {
            // make a GET request to the / endpoint on the server
            return request(server)
                .get('/')
                .then(res => {
                    // successful request 
                    expect(res.status).toBe(200);
                });
        });

        it("GET / should return { say: 'Hello!' }", async () => {
        
        const res = await request(server).get('/');

        expect(res.body.say).toBe('Hello!');
        expect(res.body).toEqual({ say: 'Hello!' });
        });

        it('GET / returns JSON', done => {
        request(server)
            .get('/')
            .then(res => {
                // successful get 
                expect(res.type).toMatch(/json/i);
            done();
            });
        });
    });
});
