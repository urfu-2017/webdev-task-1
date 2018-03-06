import request from 'supertest';

import app from '../index';

describe('GET /', () => {
    it('respond with html page', done => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});
