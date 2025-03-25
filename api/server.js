// Express server
import express from 'express';
import cors from 'cors';
import router from './routes/index';
import bodyParser from 'body-parser';
import 'dotenv/config';

const api = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// Configure CORS for development
api.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Token', 'X-Requested-With']
}));

api.use(express.json());
api.use(bodyParser.json({ limit: '800kb' }));
api.use('/', router);

// Health check endpoint
api.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
api.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

api.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

module.exports = api;
