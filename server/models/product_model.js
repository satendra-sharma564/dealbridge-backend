const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number,
    mrp: Number,
    description: String,
    category: String,
    discount: Number,
    links: [{
        platform: String,
        url: String
    }]
}, { timestamps: true }); // ✅ createdAt & updatedAt auto-generate

module.exports = mongoose.model('Product', productSchema);