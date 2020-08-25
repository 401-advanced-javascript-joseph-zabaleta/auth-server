'use strict';

/** 3rd Party */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const schema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    fullname: { type: String },
    role: { type: String, default: 'user', enum: ['admin', 'editor', 'user'] },
});


schema.pre('save', async function() {

    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 5);
    };

});


// schema.statics.authenticateBasic = function (username, password) {
//     let query = { username };

//     return this.findOne(query)
//         .then(user => {
//             console.log('username found', user);
//             //user && user.comparePassword(password)
//         })
//         .catch( (err) => {
//             console.log('something broke!')
//         });
// };


// schema.methods.comparePassword = function(plainPassword) {
//     return bcrypt.compare(plainPassword, this.password)
//         .then( results => {
//             if (results) {
//                 return this;
//             } else {
//                 return
//             }
//         })
// };

// schema.methods.generateToken = function() {
//     //something
// };


module.exports = mongoose.model('user', schema);
