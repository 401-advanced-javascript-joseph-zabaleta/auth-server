'use strict';

require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');

const user = require('../../../../../src/auth/models/users/users-models.js');

let testUser1 = { username: 'admin', password: 'password' };
let testUser2 = { username: 'bob', password: 'password' };
let SECRET = 'theSuperSecretMessage';

describe('Testing Users Model Functionality: ', () => {

    it('Should create() a new user record', async () => {

        let newUser = await user.create(testUser1);

        expect(newUser.username).toEqual(testUser1.username);
        expect(newUser.password).not.toEqual(testUser1.password);
    });


    it('Should get() by id', async () => {
        let newUser = await user.create(testUser1);

        let record = await user.get(newUser._id);

        expect(record.length).toEqual(1);
        expect(record[0].username).toEqual(testUser1.username);

    });


    it('Should get() by username', async () => {
        let newUser = await user.create(testUser1);

        let record = await user.getByUsername(newUser.username);

        expect(record.username).toEqual(testUser1.username);
    });


    it('Should return true for authorized user during validation check', async () => {

        let results = await user.authenticateUser('admin', 'password');

        expect(results).toBeTruthy();

    });

    it('Should return false for unauthorized user during validation check', async () => {

        let results = await user.authenticateUser('FakeUser', 'fakePassword');

        expect(results).toBeFalsy();
    });

    it('Should generate a JWT for a user', async () => {
        let newUser = await user.create(testUser1);

        let token = await user.generateToken(newUser.username);

        let success = jwt.verify(token, SECRET);

        expect(success).toBeDefined();
    });

    it('Should compare passwords properly', async () => {
        let newUser = await user.create(testUser1);

        let plainPassword = 'password'

        let compared = await user.comparePassword(plainPassword, newUser.password);

        console.log(compared);
    });

});
