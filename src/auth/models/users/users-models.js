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

};

module.exports = new User();
