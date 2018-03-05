import request from 'supertest';
import { launchApp } from '../index';

const app = launchApp();

describe('GET /', () => {
    it('respond with html page', done => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});
