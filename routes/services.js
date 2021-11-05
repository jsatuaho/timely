const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Service } = require('../models/service');

router.get('/', asyncMiddleware(async (req, res, next) => {
    try {
        services = await Service.find().sort('name');
        res.send(services);
    }
    catch(err) {
         next(ex);
    }
}));

router.post('/', auth, asyncMiddleware(async (req,res) => {
    let service = new Service({ name: req.body.name });

    service = await service.save();

    res.send(service);
}));

router.get('/:id', asyncMiddleware(async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).send('This service was not found');
    res.send(service);
}));

router.put('/:id', auth, asyncMiddleware(async (req, res) => {
    const { error } =  validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const service = await Service.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true })
    
    if (!service) return res.status(404).send('This service was not found');

    res.send(service);
}));

router.delete('/:id', auth, asyncMiddleware(async (req, res) => {
    const service = await Service.findByIdAndDelete( { _id: req.params.id } );
    if (!service) return res.status(404).send('This service was not found');
    res.send(service);
}));

module.exports = router;