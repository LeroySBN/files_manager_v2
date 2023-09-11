import Bull from 'bull';
// import fs from 'fs';
import { ObjectId } from 'mongodb';
import thumbnail from 'image-thumbnail';
import dbClient from './utils/db';

const fileQueue = new Bull('fileQueue');

fileQueue.process(async (job) => {
  const { userId, fileId } = job.data;

  if (!fileId) {
    throw new Error('Missing fileId');
  }
  if (!userId) {
    throw new Error('Missing userId');
  }

  const file = await dbClient.db.collection('files').findOne({
    _id: ObjectId(fileId),
    userId: ObjectId(userId),
  });

  if (!file) {
    throw new Error('File not found');
  }

  if (file.type !== 'image' && file.localPath) {
    const sizes = [500, 250, 100];

    for (const size of sizes) {
      const thumbnailPath = `${file.localPath}_${size}`;
      thumbnail(file.localPath, { width: size, height: size, fit: 'cover' }).toFile(thumbnailPath);
    }
  }
});
