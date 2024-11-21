import { schema, normalize } from 'normalizr';
// import * as notificationsData from '../../../../notifications.json'
import * as notificationsData from '../../dist/notifications.json'

const user = new schema.Entity('users');

const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });

export const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

const normalizedData = normalize(notificationsData, [notification]);

export function getAllNotificationsByUser(userId) {
  const notifications = [];
  const allNotifications = normalizedData.entities.notifications;
  const messages = normalizedData.entities.messages;

  for (const key in allNotifications) {
    if (allNotifications[key].author === userId) {
      notifications.push(messages[allNotifications[key].context]);
    }
  }

  return notifications;
}

export { normalizedData };