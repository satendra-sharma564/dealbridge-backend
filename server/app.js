const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');

connectDB();

const productRoutes = require('./routes/product_routes');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('DealBridge Backend is running 🚀');
});
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});