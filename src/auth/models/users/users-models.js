'use strict';

/** 3rd Party */
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/** Local */
const schema = require('./users-schema.js');
const MongoService = require('../mongo-service.js');


class User extends MongoService {

    constructor() {
        super(schema);
    };


    async authenticateUser(username, password) {

        let results = await this.getByUsername(username);

        if (!results) {
            return false;
        };

        let valid = await bcrypt.compare(password, results.password);

        if (valid) {
            return results;
        } else {
            return false;
        };

    };

    generateToken(username) {
        return jwt.sign(username, process.env.SECRET);
    };

    comparePassword(password) {
        return bcrypt.compare(password, this.password)
            .then(results => {
                if (results) {
                    return this;
                } else {
                    return;
                };
            }).catch( (err) => {
                console.log('compare fail');
            });
    }

    async validateUsername(username) {
        let results = await this.getByUsername(username);

        if (!results) {
            return false;
        }

        return true;

    };

};

module.exports = new User();
