import Bull from 'bull';
// import fs from 'fs';
import { ObjectId } from 'mongodb';
import thumbnail from 'image-thumbnail';
import dbClient from './utils/db';

const fileQueue = new Bull('fileQueue');
const THUMBNAIL_SIZE = {
  'large': 500,
  'medium': 250,
  'small': 100,
}

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

  const sizes = [THUMBNAIL_SIZE.large, THUMBNAIL_SIZE.medium, THUMBNAIL_SIZE.small];
  
  for (const size of sizes) {
    const thumbnailPath = `${file.localPath}_${size}`;
    let options = { width: size, height: size, fit: 'cover' };
    await thumbnail(file.localPath, options).toFile(thumbnailPath);
  }
});
