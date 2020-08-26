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
                return null;
            };

            let valid = await bcrypt.compare(password, results.password);

            if (valid) {
                return results;
            } else {
                return null;
            };

        } catch (err) {
            console.log(err);
            throw err;

        }


    };

    generateToken(currentUser) {
        //maybe sign with an object not a string to include username, and expiration at a minimum


        let obj = {
            username: currentUser.username,
            role: currentUser.role,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        };

        let output = jwt.sign(obj, process.env.SECRET);
        return output;
    };


    static async verifyToken(token) {
        return jwt.verify(token, process.env.SECRET);
    }


    async validateUsername(username) {
        let results = await this.getByUsername(username);

        return results ? true : false;

    };

};

module.exports = User;
