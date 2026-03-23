const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    productId: String,
    productTitle: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Click', clickSchema);