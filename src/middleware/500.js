'use strict';

function worstCaseHandler(err, res) {
    console.log(err);
    res.status(500).send('An error has occured on the server.')
};

module.exports = worstCaseHandler;
