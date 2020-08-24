'use strict';

/** 3rd Party */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    fullname: { type: String },
    role: { type: String },
});

module.exports = mongoose.model('user', schema);
