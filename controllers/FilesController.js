import { ObjectID } from 'mongodb';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import mime from 'mime-types';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class FilesController {
  /**
   * Createa a new file document in the DB if the user is authenticated
   * Endpoint: POST /files
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof FilesController
   */
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

  /**
   * Retrieve a file document based on the ID if the user is the owner of the file
   * Endpoint: GET /files/:id
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof FilesController
   */
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

    if (!file) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json({
      id: file._id,
      userId: file.userId,
      name: file.name,
      type: file.type,
      isPublic: file.isPublic,
      parentId: file.parentId,
    });
  }

  /**
   * Retrieve all users file documents for a specific parentId and with pagination
   * if the user is the owner of the file
   * Endpoint: GET /files
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof FilesController
   */
  static async getIndex(req, res) {
    const token = req.header('X-Token');
    const userId = await redisClient.get(`auth_${token}`);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // const { parentId = 0, page = 0 } = req.query;
    const parentId = req.query.parentId || 0;
    let page = parseInt(req.query.page, 10);
    if (!Number.isInteger(page) || page < 0) {
      page = 0;
    }
    const pageSize = 20;
    const skipCount = page * pageSize;

    let parentIdObjectID;
    if (parentId !== 0) {
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

    const filesCollection = await dbClient.db.collection('files');
    const files = await filesCollection
      .aggregate([
        { $match: { parentId: parentIdObjectID || 0 } },
        { $skip: skipCount },
        { $limit: pageSize },
      ]).toArray();

    const filesObj = [];
    files.forEach((file) => {
      filesObj.push({
        id: file._id,
        userId: file.userId,
        name: file.name,
        type: file.type,
        isPublic: file.isPublic,
        parentId: file.parentId,
      });
    });

    return res.status(200).json(filesObj);
  }

  /**
   * Update a file document based on the ID by setting isPublic to true
   * if the user is the owner of the file
   * Endpoint: PUT /files/:id/publish
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof FilesController
   */
  static async putPublish(req, res) {
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

    if (!file) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Update the file document based on the ID
    const updatedFile = await dbClient.db.collection('files').updateOne(
      { _id: new ObjectID(fileId) },
      { $set: { isPublic: true } },
    );

    if (!updatedFile) {
      return res.status(400).json({ error: 'Not found' });
    }

    return res.status(200).json({
      id: file._id,
      userId: file.userId,
      name: file.name,
      type: file.type,
      isPublic: true,
      parentId: file.parentId,
    });
  }

  /**
   * Update a file document based on the ID by setting isPublic to false
   * if the user is the owner of the file
   * Endpoint: PUT /files/:id/unpublish
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof FilesController
   */
  static async putUnpublish(req, res) {
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

    if (!file) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Update the file document based on the ID
    const updatedFile = await dbClient.db.collection('files').updateOne(
      { _id: new ObjectID(fileId) },
      { $set: { isPublic: false } },
    );

    if (!updatedFile) {
      return res.status(400).json({ error: 'Not found' });
    }

    return res.status(200).json({
      id: file._id,
      userId: file.userId,
      name: file.name,
      type: file.type,
      isPublic: false,
      parentId: file.parentId,
    });
  }

  /**
   * Retrieve the content of a file document based on the ID
   * if the user is the owner of the file or the file is public
   * Endpoint: GET /files/:id/data
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof FilesController
   */
  static async getFile(req, res) {
    // Retrieve the user based on the token
    const token = req.header('X-Token');
    const userId = await redisClient.get(`auth_${token}`);

    // Retrieve the file document based on the ID
    const fileId = req.params.id;
    const file = await dbClient.db.collection('files').findOne({
      _id: new ObjectID(fileId),
    });

    if (!file) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (file.userId.toString() !== userId && !file.isPublic) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (file.type === 'folder') {
      return res.status(400).json({ error: 'A folder doesn\'t have content' });
    }

    if (!file.localPath) {
      return res.status(404).json({ error: 'Not found' });
    }

    const mimeType = mime.lookup(file.name);
    res.setHeader('Content-Disposition', `inline; filename=${file.name}`);
    res.setHeader('Content-Type', mimeType);
    const fileStream = fs.createReadStream(file.localPath);
    fileStream.pipe(res);
    return res.status(200).sendFile(file.localPath);
  }
}

module.exports = FilesController;
