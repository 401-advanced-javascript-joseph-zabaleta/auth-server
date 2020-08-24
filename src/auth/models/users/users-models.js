'use strict';

/** 3rd Party */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Local */
const schema = require('./users-schema.js');
const MongoService = require('../mongo-service.js');


class User extends MongoService {

    constructor() {
        super(schema);
    };


    authenticateUser(username, password) {
        //something
    };

    generateToken(username) {
        //something
    };

    // async uniqueUser(username) {
    //     let results = await this.getByUsername(username);

    //     if (results !== []) {
    //        return true
    //     } else {
    //         return false;
    //     }

    // }

    // /**
    //  * Converts plain text password into a hashed password
    //  * @param {*} password
    //  */
    // hash(password) {
    //     return bcrypt.hash(password, 5);
    // };



};

module.exports = new User();
