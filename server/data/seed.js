const mongoose = require('mongoose');
const Product = require('../models/product_model');
require('dotenv').config({ path: '../../.env' });

const MONGO_URI = process.env.MONGO_URI;

const products = [
    {
        title: "iPhone 14",
        image: "https://picsum.photos/seed/iphone/300/300",
        price: 79999,
        description: "Latest Apple iPhone with A15 Bionic chip",
        category: "Electronics"
    },
    {
        title: "Sony Headphones",
        image: "https://picsum.photos/seed/headphones/300/300",
        price: 1999,
        description: "Noise cancelling wireless headphones",
        category: "Electronics"
    },
    {
        title: "Dell Laptop",
        image: "https://picsum.photos/seed/laptop/300/300",
        price: 55999,
        description: "High performance laptop for professionals",
        category: "Electronics"
    },
    {
        title: "Running Shoes",
        image: "https://picsum.photos/seed/shoes/300/300",
        price: 2499,
        description: "Comfortable running shoes for daily use",
        category: "Fashion"
    },
    {
        title: "The Alchemist",
        image: "https://picsum.photos/seed/book/300/300",
        price: 299,
        description: "Bestselling novel by Paulo Coelho",
        category: "Books"
    },
    {
        title: "Samsung Galaxy S23",
        image: "https://picsum.photos/seed/samsung/300/300",
        price: 69999,
        description: "Flagship Android smartphone",
        category: "Mobiles"
    }
];

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    await Product.deleteMany({});
    console.log('Old products cleared');
    await Product.insertMany(products);
    console.log('✅ Products seeded successfully!');
    mongoose.disconnect();
}

seed().catch(console.error);
