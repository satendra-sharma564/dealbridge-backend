const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    category: String
});

module.exports = mongoose.model('Product', productSchema);