'use strict';

/** 3rd Party */
const express = require('express');
const router = express.Router();

/** Local */
const bearer = require('./auth/middleware/bearer.js');

router.get('/secret', bearer, (req, res) => {
    res.status(200).send(req.user);
});

module.exports = router;
