const express = require ('express');
const home = express.Router();

home.get('/', (req,res) => {
    res.send('Welcome, please log in or register!');
});

module.exports = home;