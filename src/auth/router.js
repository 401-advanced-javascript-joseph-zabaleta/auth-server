'use strict';

/** 3rd Party */
const express = require('express');
const router = express.Router();


/** Local */
const user = require('./models/users/users-models.js');
const basicAuth = require('./middleware/basic.js');

/** Routes */
router.post('/signup', signUp);
router.post('/signin', basicAuth, signIn);
router.get('/users', getUsers) //add middleware


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

       res.status(200).send(newUser);

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

    if (req.token) {
        res.cookie('token', req.token.token);
        res.header('token', req.token.token);
        res.status(200).send(req.token);
    } else {
        res.status(403).send('Invalid Credentials');
    };

};


/**
 * getUsers will query the database for all user accounts.
 * @param {*} req
 * @param {*} res
 */
async function getUsers(req, res) {
    let results = await user.get();
    res.send(results);
};

module.exports = router;
