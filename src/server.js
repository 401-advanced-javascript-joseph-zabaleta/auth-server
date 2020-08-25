'use strict';

/** 3rd Party */
const express = require('express');
const app = express();
app.use(express.json());

/** Local */
const router = require('./auth/router.js');


/** Routes */
app.use('/api/v1', router);


function start(port) {
    app.listen(port, () => {
       console.log(`Server running on PORT: ${port}`);
    });
};

module.exports = {
    server: app,
    start: start,
};
