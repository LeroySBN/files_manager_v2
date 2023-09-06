import { ObjectID } from 'mongodb';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class FilesController {
  static async postUpload(req, res) {
    const token = req.header('X-Token');
    const userId = await redisClient.get(`auth_${token}`);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      name, type, parentId = 0, isPublic = false, data,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }
    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing type' });
    }
    if (!data && type !== 'folder') {
      return res.status(400).json({ error: 'Missing data' });
    }
    if (parentId !== 0) {
      const parent = await dbClient.db.collection('files').findOne({ _id: ObjectID(parentId) });
      if (!parent) {
        return res.status(400).json({ error: 'Parent not found' });
      }
      if (parent.type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder' });
      }
    }

    let localPath;
    if (type !== 'folder') {
      const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      localPath = `${folderPath}/${uuidv4()}`;
      const bufferData = Buffer.from(data, 'base64');
      fs.writeFileSync(localPath, bufferData);
    }

    let parentIdObjectID;
    if (parentId !== 0) {
      try {
        parentIdObjectID = new ObjectID(parentId);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid parentId' });
      }

      const parentFile = await dbClient.db.collection('files').findOne({ _id: parentIdObjectID });

      if (!parentFile) {
        return res.status(400).json({ error: 'Parent not found' });
      }
      if (parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder' });
      }
    }

    const fileDocument = {
      userId: new ObjectID(userId),
      name,
      type,
      parentId: parentIdObjectID || 0,
      isPublic,
      localPath: localPath || null,
    };

    const insertedFile = await dbClient.db.collection('files').insertOne(fileDocument);

    return res.status(201).json({
      id: insertedFile.insertedId,
      userId: new ObjectID(userId),
      name,
      type,
      isPublic,
      parentId: parentIdObjectID || 0,
      // ...fileDocument,
    });
  }

  static async getShow(req, res) {
    // Retrieve the user based on the token
    const token = req.header('X-Token');
    const userId = await redisClient.get(`auth_${token}`);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieve the file document based on the ID
    const fileId = req.params.id;
    const file = await dbClient.db.collection('files').findOne({
      _id: new ObjectID(fileId),
      userId: new ObjectID(userId),
    });

    if (!file || file.userId.toString() !== userId || file.type === 'folder') {
      return res.status(404).json({ error: 'Not found' });
    }

    const {
      type, isPublic, name, parentId,
    } = file;

    return res.status(200).json({
      id: fileId,
      userId,
      name,
      type,
      isPublic,
      parentId,
    });
  }

  static async getIndex(req, res) {
    const token = req.header('X-Token');
    const userId = await redisClient.get(`auth_${token}`);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { parentId = '0', page = 0 } = req.query;

    let parentIdObjectID;
    if (parentId !== '0') {
      try {
        parentIdObjectID = new ObjectID(parentId);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid parentId' });
      }

      const parentFile = await dbClient.db.collection('files').findOne({ _id: parentIdObjectID });

      if (!parentFile || parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent not found or not a folder' });
      }
    }

    const filesCollection = dbClient.db.collection('files');
    const files = await filesCollection
      .find({ parentId: parentIdObjectID || '0' })
      .skip(page * 20)
      .limit(20)
      .toArray();

    return res.status(200).json(files);
  }
}

module.exports = FilesController;
