'use strict';

/** 3rd Party */
const express = require('express');
const router = express.Router();


/** Local */
const User = require('./models/users/users-models.js');
const user = new User();
const basicAuth = require('./middleware/basic.js');
const oauth = require('./middleware/oauth.js');
const bearer = require('./middleware/bearer.js');
const worstCaseHandler = require('../middleware/500.js');

/** Routes */
router.post('/signup', signUp);
router.post('/signin', basicAuth, signIn);
router.get('/users', bearer, getUsers) // add middleware to restrict
router.get('/oauth', oauth, approved);

/** Route Callbacks */

/**
 * SignUp will create a new user and save them to the database.
 * @param {*} req
 * @param {*} res
 */
async function signUp(req, res) {

    let valid = await user.validateUsername(req.body.username);

    if (valid) {
        res.send('Username is already in use.');
        return;
    };

   try {

       let newUser = await user.create({
           username: req.body.username,
           password: req.body.password,
           role: req.body.role ? req.body.role : 'user',
       });

       let token = user.generateToken(newUser);

       res.status(200).send(token);

   } catch (err) {

        worstCaseHandler(err, res);
   };

};


/**
 * SignIn will update the response header and token with the users token value upon validation of users authentication.
 * @param {*} req
 * @param {*} res
 */
async function signIn(req, res) {

    res.cookie('token', req.token.token);
    res.header('token', req.token.token);
    res.status(200).send({
        token: req.token,
        user: req.user,
    });

};


/**
 * getUsers will query the database for all user accounts.
 * @param {*} req
 * @param {*} res
 */
async function getUsers(req, res) {
    let results = await user.get();
    res.status(200).send(results);
};



function approved(req, res) {
    console.log(req.user);
    res.status(200).send(req.token);
};

module.exports = router;
