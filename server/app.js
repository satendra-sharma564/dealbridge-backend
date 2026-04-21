// ✅ Override local DNS with Google DNS (local DNS fails to resolve Atlas SRV records)
require('dns').setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');

// ✅ Telegram Auto-Post Scheduler
const { startScheduler } = require('./bot/scheduler');

// ✅ DB Connect — pehle DB connect ho, PHIR scheduler start
connectDB().then(() => {
    startScheduler();
}).catch(err => {
    console.error('DB connection failed:', err.message);
});

// ✅ Routes import
const productRoutes = require('./routes/product_routes');
const clickRoutes = require('./routes/click_routes');
const platformRoutes = require('./routes/platform_routes');
const versionRoutes = require('./routes/version_routes');
const categoryRoutes = require('./routes/category_routes');
const notificationRoutes = require('./routes/notification_routes');

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
    res.send('DealBridge Backend is running 🚀');
});

// ✅ API Routes (clean structure)
// app.use('/api/products', productRoutes);
app.use('/api', productRoutes);
app.use('/api/click', clickRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api', versionRoutes);
app.use('/api', categoryRoutes);
app.use('/api/notifications', notificationRoutes);

// ✅ Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});