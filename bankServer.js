import 'dotenv/config';
import express from 'express';
import { errorHandler } from './middlewares/errorMiddleware.js';
import bankRoutes from './routes/bankRoutes.js';
import cors from 'cors';

const app = express();

// cors middleware
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Bank Routes
app.use('/api/v1/bank', bankRoutes);

// Define a route for the root path ("/")
app.get('/', (req, res) => {
  res.send('Hello, your server is up and running!');
});

// Error handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
