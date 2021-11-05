const asyncMiddleware =  require('../middleware/async');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const { Reservation } = require('../models/reservation');
const { User } = require('../models/user');
const { Service } = require('../models/service');

router.get('/', asyncMiddleware(async (req, res) => {
    const reservations = await Reservation.find().sort('-reservationDate');
    res.send(reservations);
}));

router.post('/', auth, asyncMiddleware(async (req,res) => {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(400).send('No such user.');
    console.log(user);

    const service = await Service.findById(req.body.service.serviceId);
    console.log(service);
    if (!service) return res.status(400).send('No such service.');

    let reservation = new Reservation({ 
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        service: {
            _id: service._id,
            name: service.name
        },
        reservationDate: req.body.reservationDate,
        reservationTime: req.body.reservationTime,
        reservationDuration: req.body.reservationDuration
        });

    try {
        reservation = await reservation.save();
        console.log (reservation);
    } catch (ex) {
         return console.log(ex.message);
    }
    res.send(reservation);
}));

module.exports = router;