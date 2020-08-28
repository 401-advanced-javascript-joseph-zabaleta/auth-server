'use strict';

/** Local */
const User = require('../models/users/users-models.js');

async function bearer(req, res, next) {

    if (!req.headers.authorization) {
        res.status(401).send('No Authorization headers');
        return;
    }

    let [authType, token] = req.headers.authorization.split(' ');

    try {
        let validUser = await User.verifyToken(token);
        req.user = validUser;
        next();
    } catch (err) {

        if (err.name === 'TokenExpiredError') {
            res.status(401).send('Token Expired Please log in again.');
        } else {
            console.log(err);
            res.status(500).send('An error has occured on the server.')
        };


    };



};

module.exports = bearer;
