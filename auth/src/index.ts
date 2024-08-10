import mongoose from 'mongoose';
const dotenv = require('dotenv');
import { app } from './app';


const start = async () => {
  // Load the appropriate .env file based on the environment
  const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
  dotenv.config({ path: envFile });

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
