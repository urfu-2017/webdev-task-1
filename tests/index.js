'use strict';
const request = require('supertest');

const app = require('../index');

describe('GET /', () => {
    it('respond with html page', done => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});


describe('GET /business', () => {
    it('respond with html page', done => {
        request(app)
            .get('/business')
            .expect(200, done);
    });
});

describe('GET /BAD_BAD_BAD', () => {
    it('should give 404', done => {
        request(app)
            .get('/BAD_BAD_BAD')
            .expect(404, done);
    });
});
