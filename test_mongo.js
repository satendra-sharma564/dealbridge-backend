require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log('🔍 Testing URI:', uri ? uri.replace(/:([^:@]+)@/, ':***@') : 'URI NOT FOUND');

mongoose.connect(uri)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ Full Error:', err.message);
    console.log('🔎 Error Code:', err.code);
    process.exit(1);
  });
