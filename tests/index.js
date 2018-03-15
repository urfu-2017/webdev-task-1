'use strict';
const request = require('supertest');

const app = require('../index');

describe('GET /', () => {
    it('respond with html page', done => {
        request(app)
            .get('/')
            .timeout(5000)
            .expect(200, done);
    });
});
