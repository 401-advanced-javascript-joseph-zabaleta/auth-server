'use strict';

require('@code-fellows/supergoose');

const user = require('../../../../../src/auth/models/users/users-models.js');

let testUser1 = { username: 'admin', password: 'password' };
let testUser2 = { username: 'bob', password: 'password' };

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
        let newUser = await user.create(testUser2);

        let results = await user.authenticateUser('admin', 'password');

        expect(results).toBeTruthy();

    });

    it('Should return false for unauthorized user during validation check', async () => {
        let newUser = await user.create(testUser2);

        let results = await user.authenticateUser('FakeUser', 'fakePassword');

        expect(results).toBeFalsy();
    });

});
