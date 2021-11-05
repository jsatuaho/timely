const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

const User = mongoose.model('User', userSchema);

function generateAuthToken(user) {
    const token =  jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    return token;
}

exports.userSchema = userSchema;
exports.User = User;
exports.generateAuthToken = generateAuthToken;