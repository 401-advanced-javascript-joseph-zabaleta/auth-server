'use strict';

/** 3rd Party */
const express = require('express');
const router = express.Router();


/** Local */
const user = require('./models/users/users-models.js');
const { response } = require('express');

/** Routes */
router.post('/signup', signUp);
router.post('/signin', signIn); //add middleware
router.get('/users', getUsers) //add middleware


/** Route Callbacks */


/**
 * SignUp will create a new user and save them to the database.
 * @param {*} req
 * @param {*} res
 */
async function signUp(req, res) {


    // if (user.uniqueUser(req.body.username)) {
    //     response.send('Username is already in use.');
    //     return;
    // };

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


async function signIn(req, res) {
    //something
};


async function getUsers(req, res) {
    //something
};

module.exports = router;
