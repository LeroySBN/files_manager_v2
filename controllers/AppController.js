// Controllers
// Description: This file contains all the controllers for the application
const DBClient = require('../utils/db');
const RedisClient = require('../utils/redis');

const AppController = {
  getStatus: async (req, res) => {
    const redisStatus = RedisClient.isAlive();
    const dbStatus = await DBClient.isAlive();
    if (redisStatus && dbStatus) {
      res.status(200).json({ redis: true, db: true });
    } else {
      res.status(200).json({ redis: redisStatus, db: dbStatus });
    }
  },

  getStats: async (req, res) => {
    const users = await DBClient.nbUsers();
    const files = await DBClient.nbFiles();
    res.status(200).json({ users, files });
  },
};

module.exports = AppController;
