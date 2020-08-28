'use strict';

/** 3rd Party */
require('dotenv').config();
const mongoose = require('mongoose');

/** Local */
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});


server.start(PORT);

