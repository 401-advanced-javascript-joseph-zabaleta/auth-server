'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

const { server } = require('../../../src/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

let version = '/api/v1';

const userData1 = { username: 'admin', password: 'password', role: 'admin', email: 'admin@admin.com' };
let user1_token;
const userData2 = { username: 'joey', password: 'password', role: 'admin', email: 'admin@admin.com' };

let expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZENoaWNrZW4iLCJyb2xlIjoidXNlciIsImV4cCI6MTU5ODU3MzMwMywiaWF0IjoxNTk4NTY5NzAzfQ.D8hgwCWdcuou20B2WqDtXXH5lZ3nKTb_IUv74SigU3w'

// let spyLog = jest.spyOn(console, 'log');
// beforeEach(() => {
//     spyLog.mockReset();
// });

describe('Secret Router IT Tests', () => {

    describe('Testing /secret route: ', () => {


        it('Should properly access the /secret route with valid token', async () => {

            let res = await mockRequest.post(version + '/signup').send(userData1);
            // let token = jwt.verify(res.text, process.env.SECRET);
            user1_token = res.text;

            let response = await mockRequest.get('/secret')
                .set('Authorization', 'bearer ' + user1_token)

            // console.log(response);

            expect(response.status).toEqual(200);
            expect(response.body.username).toEqual('admin');

        });


        it('Should denie access to /secret route with no Authorization headers', async () => {

            let res = await mockRequest.get('/secret')

            expect(res.status).toEqual(401);
            expect(res.text).toEqual('No Authorization headers');

        });

        it('Should denie access to /secret route with expired token', async () => {

            let res = await mockRequest.get('/secret')
                .set('Authorization', 'bearer ' + expiredToken);

            expect(res.status).toEqual(401);
            expect(res.text).toEqual('Token Expired Please log in again.');

        });

    });

});
