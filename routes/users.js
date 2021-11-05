const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User, generateAuthToken } = require('../models/user');

router.get('/me', auth, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    console.log(user);
    res.send(user);
}));

router.post('/', asyncMiddleware(async (req,res) => {
    let user = await User.findOne( { email: req.body.email } );
    if (user) return res.status(400).send('User already registered');

    user = new User(
        _.pick(req.body, ['name', 'email', 'password'])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        user = await user.save();
        console.log (user);
    } catch (ex) {
         return console.log(ex.message);
    }

    const token = generateAuthToken(user);
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
}));

module.exports = router;