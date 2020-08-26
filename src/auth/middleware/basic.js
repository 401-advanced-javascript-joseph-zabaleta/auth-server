'use strict';

/** 3rd Party */
const base64 = require('base-64');

/** Local */
const User = require('../models/users/users-models.js');
const user = new User();

async function basicAuth(req, res, next) {

    let basic = req.headers.authorization.split(' ').pop();
    let [username, password] = base64.decode(basic).split(':');

    let current = await User.authenticateBasic(username, password);

    if (current) {

        req.token = user.generateToken(username);
        next();

    } else {

        res.status(401).send('Invalid Credentials');

    };


};

module.exports = basicAuth;
