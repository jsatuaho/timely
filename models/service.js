const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        }
    })

const Service = mongoose.model('Service', serviceSchema);

exports.serviceSchema = serviceSchema;
exports.Service = Service;