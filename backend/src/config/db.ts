import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { env } from './env.js';

// Better Auth no usa Mongoose: trabaja con el driver oficial sobre la misma base.
export const mongoClient = new MongoClient(env.MONGODB_URI);
export const database = mongoClient.db();

export async function connectDB() {
  await Promise.all([mongoose.connect(env.MONGODB_URI), mongoClient.connect()]);
  console.log('Conectado a MongoDB Atlas');
}
