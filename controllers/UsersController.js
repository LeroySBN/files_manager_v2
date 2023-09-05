// Users controller
// Description: This controller is responsible for handling all the user related requests
// and responses.
import sha1 from 'sha1';

import dbClient from '../utils/db';

class UsersController {
  static postNew(request, response) {
    const { email, password } = request.body;

    if (!email) {
      response.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      response.status(400).json({ error: 'Missing password' });
      return;
    }

    const users = dbClient.db.collection('users');
    users.findOne({ email }, (err, user) => {
      if (user) {
        response.status(400).json({ error: 'Already exist' });
      } else {
        const hashedPassword = sha1(password);
        users.insertOne(
          {
            email,
            password: hashedPassword,
          },
        ).then((result) => {
          response.status(201).json({ id: result.insertedId, email });
        }).catch((error) => console.log(error));
      }
    });
  }
}

module.exports = UsersController;
