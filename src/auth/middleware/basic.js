'use strict';

/** 3rd Party */
const base64 = require('base-64');

/** Local */
const user = require('../models/users/users-models.js');

async function basicAuth(req, res, next) {

    let basic = req.headers.authorization.split(' ').pop();
    let [username, password] = await base64.decode(basic).split(':');

    let current = await user.authenticateUser(username, password);

    if (current) {

        req.token = {
            username: current,
            token: user.generateToken(username),
        };

        next();
    } else {
        next('Invalid Login');
    };


};

module.exports = basicAuth;
