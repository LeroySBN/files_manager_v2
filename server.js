// Express server
import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

app.use(express.json());
app.use(bodyParser.json({ limit: '800kb' }));
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
