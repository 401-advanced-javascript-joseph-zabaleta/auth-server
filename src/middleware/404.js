'use strict';

function errorHandler(req, res, next) {
    console.log('Invalid Route!');
    res.status(404);
    res.send('Invalid route provided')
    res.end();
}

module.exports = errorHandler;
