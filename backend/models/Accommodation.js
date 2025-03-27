const mongoose = require('mongoose');

const AccommodationSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    description: String,
    amenities: [String],
    image: String
});

module.exports = mongoose.model('Accommodation', AccommodationSchema);
