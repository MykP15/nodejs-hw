
import mongoose from 'mongoose';
import { Note } from '../models/note.js';
const uri = `${process.env.MONGO_URL}`;

const clientOptions = { serverApi: { version: '1', strict: false, deprecationErrors: true } };

export async function connectMongoDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("✅ MongoDB connection established successfully");

    await Note.syncIndexes();
    console.log("Indexes synced successfully");
  } catch (error) {
    console.error('Failed to connect to db', error);
    process.exit(1);
  }


}
