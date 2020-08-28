'use strict';

require('@code-fellows/supergoose');
const bcrypt = require('bcrypt');

const User = require('../../../../../src/auth/models/users/users-models.js');
let user = new User();
let testUser1 = { username: 'admin', password: 'password' };
let testUser2 = { username: 'bob', password: 'password' };

jest.mock('bcrypt');

let spyLog = jest.spyOn(console, 'log');
beforeEach(() => {
    spyLog.mockReset();
    bcrypt.compare.mockReset();
});

beforeAll(async () => {
    await user.create(testUser1);
})


describe('Testing Users Model Functionality: ', () => {

    describe('Testing authenticateBasic method: ', () => {

        it('Should return user object of authorized user during validation check', async () => {

            bcrypt.compare.mockImplementation(() => {
                return true;
            });

            let results = await User.authenticateBasic('admin', 'password');

            expect(results.username).toEqual('admin');
            expect(results.role).toEqual('user');

        });

        it('Should return null for unauthorized user during validation check', async () => {

            bcrypt.compare.mockImplementation(() => {
                return false;
            });

            let results = await User.authenticateBasic('admin', 'fakePassword');

            expect(results).toBeNull();
        });


        it('Should return null for unauthorized user during validation check when no user is found', async () => {

            let results = await User.authenticateBasic('FakeAdmin', 'fakePassword');

            expect(results).toBeNull();
        });


        it('Should throw an error if something goes wrong', async () => {

            let myError = new Error('test')

            bcrypt.compare.mockImplementation(() => {
                throw myError;
            });

            try {
                await User.authenticateBasic('admin', 'fakePassword');
            } catch (err) {
                expect(err).toEqual(myError);
            };

        });


    });


    describe('Testing validateUsername method: ', () => {

        it('Should return true for a valid user', async () => {

            let actual = await user.validateUsername(testUser1.username);

            expect(actual).toEqual(true);


        });

        it('Should return false for a valid user', async () => {

            let actual = await user.validateUsername(testUser2.username);

            expect(actual).toEqual(false);

        });

    });


});
