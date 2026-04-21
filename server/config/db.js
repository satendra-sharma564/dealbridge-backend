const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // ✅ Google DNS — local DNS was not resolving Atlas
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected ✅");
        return true; // ✅ connected hone ka signal
    } catch (error) {
        console.log("❌ MongoDB Error:", error.message);
        throw error; // ✅ error propagate karo
    }
};

module.exports = connectDB;