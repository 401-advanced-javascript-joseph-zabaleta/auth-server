'use strict';

const bearer = require('../../../../src/auth/middleware/bearer.js');
const Users = require('../../../../src/auth/models/users/users-models.js');
const { TokenExpiredError } = require('jsonwebtoken');

jest.mock('../../../../src/auth/models/users/users-models.js');

let spyLog = jest.spyOn(console, 'log');
beforeEach( () => {
    spyLog.mockReset();
});

describe('Testing Bearer Token Middleware Functionality: ', () => {

    it('Should validate authorization headers', async () => {

        let req = {
            headers: {},
        };

        let res = {};

        res.status = jest.fn(() => {
            return res;
        });
        res.send = jest.fn();

        let next = jest.fn();

        await bearer(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('No Authorization headers');

    });

    it('Should properly verify bearer token', async () => {

        Users.verifyToken.mockImplementation(() => {
            return {};
        });

        let req = {
            headers: {
                authorization: 'Bearer YWRtaW46cGFzc3dvcmQ=',
            },
        };

        let res = {};
        let next = jest.fn();

        await bearer(req, res, next);

        expect(next).toHaveBeenCalledWith();
        expect(req.user).toEqual({});

    });

    it('Should handle TokenExpiredError', async () => {

        Users.verifyToken.mockImplementation(() => {
            throw new TokenExpiredError();
        });

        let req = {
            headers: {
                authorization: 'Bearer YWRtaW46cGFzc3dvcmQ=',
            },
        };

        let res = {};
        res.status = jest.fn(() => {
            return res;
        });
        res.send = jest.fn();

        let next = jest.fn();

        await bearer(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Token Expired Please log in again.')

    });

    it('Should handle other errors', async () => {

        Users.verifyToken.mockImplementation(() => {
            throw new Error();
        });

        let req = {
            headers: {
                authorization: 'Bearer YWRtaW46cGFzc3dvcmQ=',
            },
        };

        let res = {};
        res.status = jest.fn(() => {
            return res;
        });
        res.send = jest.fn();

        let next = jest.fn();

        await bearer(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('An error has occured on the server.')

    });

});
