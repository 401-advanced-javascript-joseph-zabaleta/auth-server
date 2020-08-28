'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const supergoose = require('@code-fellows/supergoose');
const { server } = require('../../../src/server.js');
const mockRequest = supergoose(server);

let version = '/api/v1';

const adminData = { username: 'admin', password: 'password', role: 'admin', email: 'admin@admin.com' };
const editorData = { username: 'Tony the Editor', password: 'password', role: 'editor', email: 'admin@admin.com' };
const writerData = { username: 'Mike the Writer', password: 'password', role: 'writer', email: 'admin@admin.com' };
const regularData = { username: 'Joseph the Regular', password: 'password', role: 'user', email: 'admin@admin.com' };
let expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlZENoaWNrZW4iLCJyb2xlIjoidXNlciIsImV4cCI6MTU5ODU3MzMwMywiaWF0IjoxNTk4NTY5NzAzfQ.D8hgwCWdcuou20B2WqDtXXH5lZ3nKTb_IUv74SigU3w'
let adminUser;
let editorUser;
let writerUser;
let regularUser;


// let spyLog = jest.spyOn(console, 'log');
// beforeEach(() => {
//     spyLog.mockReset();
// });

beforeAll(async () => {

    adminUser = await mockRequest.post(version + '/signup').send(adminData);
    editorUser = await mockRequest.post(version + '/signup').send(editorData);
    writerUser = await mockRequest.post(version + '/signup').send(writerData);
    regularUser = await mockRequest.post(version + '/signup').send(regularData);
});

describe('Secret Router IT Tests', () => {

    describe('Testing /secret route: ', () => {


        it('Should properly access the /secret route with valid token', async () => {

            let response = await mockRequest.get('/secret')
                .set('Authorization', 'bearer ' + regularUser.text);

            expect(response.status).toEqual(200);
            expect(response.body.username).toEqual('Joseph the Regular');

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


    describe('Testing /read route: ', () => {

        it('Should properly access the /read route with valid token and permission', async () => {

            let response = await mockRequest.get('/read')
                .set('Authorization', 'bearer ' + editorUser.text);

            expect(response.status).toEqual(200);
            expect(response.text).toEqual('Route /read worked.');

        });

    });


    describe('Testing /add route: ', () => {

        it('Should properly access the /add route with valid token and permission', async () => {

            let response = await mockRequest.get('/add')
                .set('Authorization', 'bearer ' + writerUser.text);

            expect(response.status).toEqual(200);
            expect(response.text).toEqual('Route /add worked.');

        });


        it('Should properly deny access the /add route with valid token and invalid role permission', async () => {

            let response = await mockRequest.get('/add')
                .set('Authorization', 'bearer ' + regularUser.text);

            expect(response.status).toEqual(401);
            expect(response.text).toEqual('Invalid Permissions');

        });
    });


    describe('Testing /change route: ', () => {

        it('Should properly access the /change route with valid token and permission', async () => {

            let response = await mockRequest.get('/change')
                .set('Authorization', 'bearer ' + editorUser.text);

            expect(response.status).toEqual(200);
            expect(response.text).toEqual('Route /change worked.');

        });


        it('Should properly deny access the /change route with valid token and invalid role permission', async () => {

            let response = await mockRequest.get('/change')
                .set('Authorization', 'bearer ' + regularUser.text);

            expect(response.status).toEqual(401);
            expect(response.text).toEqual('Invalid Permissions');

        });
    });


    describe('Testing /remove route: ', () => {

        it('Should properly access the /remove route with valid token and permission', async () => {

            let response = await mockRequest.get('/remove')
                .set('Authorization', 'bearer ' + adminUser.text);

            expect(response.status).toEqual(200);
            expect(response.text).toEqual('Route /remove worked.');

        });


        it('Should properly deny access the /remove route with valid token and invalid role permission', async () => {

            let response = await mockRequest.get('/remove')
                .set('Authorization', 'bearer ' + regularUser.text);

            expect(response.status).toEqual(401);
            expect(response.text).toEqual('Invalid Permissions');

        });
    });
});
