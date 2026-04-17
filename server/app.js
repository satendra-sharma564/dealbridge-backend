require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');

// ✅ DB Connect
connectDB();

// ✅ Telegram Auto-Post Scheduler
const { startScheduler } = require('./bot/scheduler');
startScheduler();

// ✅ Routes import
const productRoutes = require('./routes/product_routes');
const clickRoutes = require('./routes/click_routes');
const platformRoutes = require('./routes/platform_routes');
const versionRoutes = require('./routes/version_routes');
const categoryRoutes = require('./routes/category_routes');

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

// ✅ Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});