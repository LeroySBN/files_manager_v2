// MongoDB utils
import {MongoClient} from 'mongodb';
import 'dotenv/config';

const database = process.env.DB_DATABASE || 'files_db';
const url = process.env.MONGO_URL || 'mongodb://admin:admin_password@mongodb:27017/files_db?authSource=admin';

class DBClient {
  constructor() {
    this.client = new MongoClient(url, {
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });

    this.connected = false;
    this.connecting = false;

    // Initial connection
    this.connect();
  }

  async connect() {
    if (this.connected || this.connecting) return;

    try {
      this.connecting = true;
      await this.client.connect();
      this.db = this.client.db(database);
      this.connected = true;
      this.connecting = false;
      console.log('Successfully connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      this.connected = false;
      this.connecting = false;
      // Retry connection after 5 seconds
      setTimeout(() => this.connect(), 5000);
    }
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error('Error counting users:', err.message);
      return 0;
    }
  }

  async nbFiles() {
    if (!this.connected) {
      await this.connect();
    }
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Error counting files:', err.message);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
