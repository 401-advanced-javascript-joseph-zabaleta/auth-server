'use strict';

/** 3rd Party */
const express = require('express');
const router = express.Router();

/** Local */
const bearer = require('./auth/middleware/bearer.js');
const permission = require('./auth/middleware/permission.js');


router.get('/secret', bearer, (req, res) => {
    res.status(200).send(req.user);
});

router.get('/read', bearer, permission('read'), (req, res) => {
    res.status(200).send('Route /read worked.')
});

router.get('/add', bearer, permission('create'), (req, res) => {
    res.status(200).send('Route /add worked.')
});

router.get('/change', bearer, permission('update'), (req, res) => {
    res.status(200).send('Route /change worked.')
});

router.get('/remove', bearer, permission('delete'), (req, res) => {
    res.status(200).send('Route /remove worked.')
});

module.exports = router;
