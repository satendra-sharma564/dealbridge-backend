const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
    name: String,
    logo: String,
    link: String,
    color: String,
    category: { type: String, default: 'General' },
});

module.exports = mongoose.model('Platform', platformSchema);