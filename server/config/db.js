const mongoose = require('mongoose');

let isConnected = false;
let retryTimer = null;

const isDbConnected = () => {
  return mongoose.connection.readyState === 1;
};

const connectDB = async () => {
  if (isDbConnected()) {
    isConnected = true;
    return;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-project-discovery';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    if (retryTimer) {
      clearTimeout(retryTimer);
      retryTimer = null;
    }
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Server running in resilient mode. Retrying database connection in 10s...');
    if (!retryTimer) {
      retryTimer = setTimeout(() => {
        retryTimer = null;
        connectDB();
      }, 10000);
    }
  }
};

mongoose.connection.on('connected', () => {
  isConnected = true;
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('⚠️ MongoDB disconnected. Retrying in 10s...');
  if (!retryTimer) {
    retryTimer = setTimeout(() => {
      retryTimer = null;
      connectDB();
    }, 10000);
  }
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  console.error(`⚠️ MongoDB runtime notice: ${err.message}`);
});

module.exports = { connectDB, isDbConnected };
