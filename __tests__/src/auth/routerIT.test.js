'use strict';

require('dotenv').config();
// process.env.SECRET = 'theSuperSecretMessage';
const jwt = require('jsonwebtoken');

const { server } = require('../../../src/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

let version = '/api/v1';

const userData1 = { username: 'admin', password: 'password', role: 'admin', email: 'admin@admin.com' };
let user1_token;
const userData2 = { username: 'joey', password: 'password', role: 'admin', email: 'admin@admin.com' };

let spyLog = jest.spyOn(console, 'log');
beforeEach( () => {
    spyLog.mockReset();
});

describe('Router IT Tests', () => {

    describe('Testing /signup route: ', () => {


        it('Should properly post / sign up a new unique user', async () => {

            let res = await mockRequest.post(version + '/signup').send(userData1);
            let token = jwt.verify(res.text, process.env.SECRET);

            //saving token for bearer test
            user1_token = res.text;

            expect(token.username).toEqual(userData1.username);
            expect(token.role).toEqual(userData1.role);
        });


        it('Should properly handle a unique user conflict on creation', async () => {

            let res = await mockRequest.post(version + '/signup').send(userData1);
            expect(res.text).toEqual('Username is already in use.');

        });

    });

    describe('Testing /signin route: ', () => {


        it('It can signin with basic auth', async () => {

            await mockRequest.post(version + '/signup').send(userData2);

            const results = await mockRequest.post(version + '/signin').auth('joey', 'password');

            const token = jwt.verify(results.body.token, process.env.SECRET);

            expect(token).toBeDefined();
            expect(token.username).toEqual(userData2.username);
            expect(token.role).toEqual(userData2.role);

        });

    });

    describe('Testing /users route with bearer token: ', () => {

        it('Should return all users with valid bearer token', async () => {

            let results = await mockRequest.get(version + '/users')
                .set('Authorization', 'bearer ' + user1_token)

            let data = results.body;

            expect(data.length).toBeGreaterThanOrEqual(2);

        });

        it('Should response 500 code to non token expired errors', async () => {
            let results = await mockRequest.get(version + '/users')
                .set('Authorization', 'bearer 1093248vuadfaid');



            expect(results.status).toEqual(500);
            expect(results.text).toEqual('An error has occured on the server.')
        });
    });

    describe('Testing server IT Functionality: ', () => {

        it('Should respond with a 404 on an invalid route', async () => {

            let results = await mockRequest.get('/foo');

            expect(results.status).toEqual(404);

        });


        it('Should respond with a 404 on an invalid method', async () => {

            let results = await mockRequest.post('/foo');

            expect(results.status).toEqual(404);

        });


    });
});
