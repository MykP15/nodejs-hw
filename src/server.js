import express from 'express';
import cors from 'cors';
import { errors } from "celebrate";
import { errorHandler } from './middleware/errorHandler.js';
import 'dotenv/config';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import cookieParser from 'cookie-parser';


await connectMongoDB();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

app.use(authRoutes);
app.use('/users', userRoutes);
app.use(notesRoutes);

app.get('/test-error', (req, res) => {
  throw new Error(`Simulated server error`);
});

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
