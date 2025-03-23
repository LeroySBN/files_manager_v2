// Express server
import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';
import 'dotenv/config';

const api = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// Configure CORS for development
if (process.env.NODE_ENV !== 'production') {
  api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });
}

api.use(express.json());
api.use(bodyParser.json({ limit: '800kb' }));
api.use('/', router);

// Health check endpoint
api.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

api.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Storage directory: ${process.env.STORAGE_DIR}`);
});

module.exports = api;
