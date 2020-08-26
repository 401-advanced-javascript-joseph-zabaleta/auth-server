'use strict';

require('@code-fellows/supergoose');
const User = require('../../../../src/auth/models/users/users-models.js');
let user = new User();
let testUser1 = { username: 'admin', password: 'password' };
let testUser2 = { username: 'bob', password: 'password' };
let testUser3 = { username: 'steve', password: 'password' };
let userInstance1;

beforeAll( async () => {
   userInstance1 = await user.create(testUser1);
   await user.create(testUser3);
});


describe('Name of the group', () => {

    it('Should create() a new user record', async () => {

        let newUser = await user.create(testUser2);

        expect(newUser.username).toEqual(testUser2.username);
        expect(newUser.password).not.toEqual(testUser2.password);
    });


    it('Should get() by id', async () => {

        let record = await user.get(userInstance1._id);

        expect(record.length).toEqual(1);
        expect(record[0].username).toEqual(testUser1.username);

    });

    it('Should get() all users', async () => {

        let records = await user.get();

        expect(records.length).toBeGreaterThanOrEqual(2);
        expect(records[0].username).toEqual(testUser1.username);

    });


    it('Should get() by username', async () => {

        let record = await user.getByUsername(testUser1.username);

        expect(record.username).toEqual(testUser1.username);
    });

});
