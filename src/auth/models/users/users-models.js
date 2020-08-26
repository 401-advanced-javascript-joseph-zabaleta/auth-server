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


    static async authenticateBasic(username, password) {
        try {
            let results = await schema.findOne({ username: username });

            if (!results) {
                return false;
            };

            let valid = await bcrypt.compare(password, results.password);

            if (valid) {
                return results;
            } else {
                return false;
            };

        } catch (err) {
            console.log('error in authBasic');
            throw err;

        }


    };

    generateToken(username) {
        //maybe sign with an object not a string to include username, and expiration at a minimum
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

module.exports = User;
