// Redis utils
import {createClient} from 'redis';
import 'dotenv/config';

const redisURL = process.env.REDIS_URL;

class RedisClient {
  constructor() {
    this.client = createClient({
      url: redisURL,
    });
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err.message}`);
    });
    this.client.connect().then( r=> {
      console.log('Redis client connected to the server -', r);
    });
  }

  isAlive() {
    return this.client.isReady;
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (error) {
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
    } catch (error) {
      console.log(error);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.log(error);
    }
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
