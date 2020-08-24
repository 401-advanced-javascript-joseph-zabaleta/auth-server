'use strict';

const express = require('express');
const app = express();
app.use(express.json());











function start(port) {
    app.listen(port, () => {
       console.log(`Server running on PORT: ${port}`);
    });
};

module.exports = {
    server: app,
    start: start,
};
