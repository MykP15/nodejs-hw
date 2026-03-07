
import mongoose from 'mongoose';
const uri = `${process.env.MONGO_URL}`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export async function connectMongoDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("✅ MongoDB connection established successfully");
  } catch (error) {
    console.error('Failed to connect to db', error);
  }
}
