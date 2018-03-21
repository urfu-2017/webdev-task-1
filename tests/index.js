'use strict';
const request = require('supertest');

const app = require('../index');

describe('GET /', function () {
    // eslint-disable-next-line no-invalid-this
    this.timeout(10000);
    it('respond with html page', done => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});
