const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    mrp: Number,
    description: String,
    category: String,
    links: [{
        platform: String,
        url: String
    }]
});

module.exports = mongoose.model('Product', productSchema);