'use strict';
const request = require('supertest');

const app = require('../handlehello');

describe('GET /', () => {
    it('respond with html page', done => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});
