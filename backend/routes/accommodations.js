const express = require('express');
const Accommodation = require('../models/Accommodation');

const router = express.Router();

router.get('/', async (req, res) => {
    const accommodations = await Accommodation.find();
    res.json(accommodations);
});

router.post('/', async (req, res) => {
    const { name, location, price, description, amenities, image } = req.body;
    const accommodation = await Accommodation.create({ name, location, price, description, amenities, image });
    res.status(201).json(accommodation);
});

module.exports = router;
