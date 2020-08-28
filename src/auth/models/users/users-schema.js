'use strict';

/** 3rd Party */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    fullname: { type: String },
    role: { type: String, default: 'user', enum: ['admin', 'editor', 'user', 'writer'] },
});


schema.pre('save', async function() {

    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 5);
    };

});


module.exports = mongoose.model('user', schema);
