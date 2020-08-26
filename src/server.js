'use strict';

/** 3rd Party */
const express = require('express');
const app = express();
app.use(express.static('./public'));
app.use(express.json());


/** Local */
const router = require('./auth/router.js');
const errorHandler = require('../src/middleware/404.js');
const worstCaseHandler = require('../src/middleware/500.js');


/** Routes */
app.use('/api/v1',router);
app.use('*', errorHandler);
app.use(worstCaseHandler);

function start(port) {
    app.listen(port, () => {
       console.log(`Server running on PORT: ${port}`);
    });
};

module.exports = {
    server: app,
    start: start,
};
