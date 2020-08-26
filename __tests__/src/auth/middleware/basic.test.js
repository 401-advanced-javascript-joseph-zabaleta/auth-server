'use strict';

require('@code-fellows/supergoose');
const auth = require('../../../../src/auth/middleware/basic');
const Users = require('../../../../src/auth/models/users/users-models.js');
process.env.SECRET = 'muysecreto';
let testUser = { username: 'admin', password: 'password', role: 'admin', email: 'admin@admin.com' }

jest.mock('../../../../src/auth/models/users/users-models.js');


describe('Testing Basic Auth Middleware Functionality: ', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', async () => {

        Users.authenticateBasic.mockImplementation(() => {
            return null;
        });

        let req = {
            headers: {
                authorization: 'Basic YWRtaW46Zm9v',
            },
        };

        let res = {};

        res.status = jest.fn(() => {
            return res;
        });
        res.send = jest.fn();

        let next = jest.fn();

        await auth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Invalid Credentials');

    });

    it('logs in an admin user with the right credentials', async () => {

        Users.authenticateBasic.mockImplementation(() => {
            return testUser;
        });

        let req = {
            headers: {
                authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
            },
        };

        let res = {};
        let next = jest.fn();

        await auth(req, res, next);

        expect(next).toHaveBeenCalledWith();
        expect(req.user).toEqual(testUser.username);

    });
});
