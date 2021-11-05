const asyncMiddleware = require('../middleware/async');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User, generateAuthToken } = require('../models/user');

router.get('/', asyncMiddleware(async (req, res) => {
    let users = await User.find().sort('name');
    res.send(users);
}));

router.post('/', asyncMiddleware(async (req,res) => {
    let user = await User.findOne( { email: req.body.email } );
    if (!user) return res.status(400).send('Invalid email or password');

    const validPasswd = await bcrypt.compare(req.body.password, user.password);
    if (!validPasswd) return res.status(400).send('Invalid email or password');

    const token = generateAuthToken(user);
    res.send(token);
}));

module.exports = router;