const mongoose = require('mongoose');

async function connectDB() {
  // Use the local MongoDB instance by default. server/.env can override this
  // with a MongoDB Atlas URI or another MongoDB connection string.
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placepoint';

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('\nMongoDB connection failed.');
    console.error('Check that MongoDB Community Server is installed and its service is running.');
    console.error('For a local database, the URI should be: mongodb://127.0.0.1:27017/placepoint');
    console.error(`MongoDB error: ${error.message}\n`);
    throw error;
  }
}

module.exports = connectDB;
