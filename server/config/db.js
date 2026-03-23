const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://satendrasharma1432u_db_user:Satendra1432%40@cluster0dealbridge.itobqeo.mongodb.net/dealbridge?appName=Cluster0dealbridge", {
            tlsAllowInvalidCertificates: true,
        });
        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;