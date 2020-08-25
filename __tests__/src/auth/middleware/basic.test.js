'use strict';

require('@code-fellows/supergoose');
const basicAuth = require('../../../../src/auth/middleware/basic.js');
const user = require('../../../../src/auth/models/users/users-models.js');

describe.skip('Testing Basic Auth Middleware: ', () => {

    let errorObject = {'message': 'Invalid Username or Password', 'status': 401, 'statusMessage': 'Unauthorized'};

    beforeAll( async (done) => {
        await user.create({
            username: 'admin',
            password: 'password',
        });
    });

    it('Should fail to login for a user with the incorrect basic credentials', async () => {
        let req = {
            headers: {
                authorization: 'Basic YWRtaW46Zm9v'
            },
        };

        let res = {};
        let next = jest.fn();

        await basicAuth(req, res, next);

        let actual = 'Invalid Login'

        expect(next).toHaveBeenCalledWith(errorObject);

    });

    it('Should log in as a user with valid credentials', async () => {

        let req = {
            headers: {
                authorization: 'Basic YWRtaW46cGFzc3dvcmQ='
            },
        };

        let res = {};
        let next = jest.fn();

        await basicAuth(req, res, next);

        expect(next).toHaveBeenCalledWith();

    });

});
