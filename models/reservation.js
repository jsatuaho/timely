const mongoose = require('mongoose');
const { userSchema } = require('./user');
const { serviceSchema } = require('./service')

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref:'Service', required: true },
    reservationDate: { type: Date, required: true },
    reservationTime: { type: String, required: true },
    reservationDuration: { type: String, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

exports.Reservation = Reservation;