const express = require('express');
const home = require('../routes/home');
const services = require('../routes/services');
const reservations = require('../routes/reservations');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/services', services);
    app.use('/api/users', users);
    app.use('/api/reservations', reservations);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
}