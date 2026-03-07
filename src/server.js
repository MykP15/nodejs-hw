import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import 'dotenv/config';
import notesRoutes from './routes/notesRoutes.js';
import { connectToMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';


await connectToMongoDB();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use(logger);

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

app.use(notesRoutes);

app.get('/test-error', (req, res) => {
  throw new Error(`Simulated server error`);
});

app.use(notFoundHandler);

app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
