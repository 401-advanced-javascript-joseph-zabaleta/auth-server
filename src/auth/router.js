'use strict';

/** 3rd Party */
const express = require('express');
const router = express.Router();


/** Local */
const User = require('./models/users/users-models.js');
const user = new User();
const basicAuth = require('./middleware/basic.js');
const oauth = require('./middleware/oauth.js');

/** Routes */
router.post('/signup', signUp);
router.post('/signin', basicAuth, signIn);
router.get('/users', getUsers) // add middleware to restrict
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
       });

       let token = user.generateToken(newUser.username);

       res.status(200).send(token);

   } catch (err) {
        console.log('Failed on signup user creation');
        throw err;
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
    res.status(200).send(req.token);

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
    res.status(200).send(req.token);
};

module.exports = router;
