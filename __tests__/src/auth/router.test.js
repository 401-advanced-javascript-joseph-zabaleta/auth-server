'use strict';

process.env.SECRET = 'theSuperSecretMessage';
const jwt = require('jsonwebtoken');

const { server } = require('../../../src/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe.skip('Auth Router', () => {

    describe(`users signup/in`, () => {

      it('can sign up', async () => {

        const userData = { username: 'admin', password: 'password', role: 'admin', email: 'admin@admin.com' };

        const results = await mockRequest.post('api/v1/signup').send(userData);

        console.log('resulllts', results);


        const token = jwt.verify(results.text, process.env.SECRET);

        expect(token.id).toBeDefined();

      });

      it('can signin with basic', async () => {

        const userData = { username: 'joey', password: 'password', role: 'admin', email: 'admin@admin.com' };

        await mockRequest.post('/signup').send(userData);

        const results = await mockRequest.post('api/v1/signin').auth('joey', 'password');

        const token = jwt.verify(results.text, process.env.SECRET);

        expect(token).toBeDefined();

      });

    });
});
