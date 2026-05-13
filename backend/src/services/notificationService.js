const Notification = require('../models/Notification');

const createNotification = async (data) => {
  const notification = await Notification.create(data);
  
  // Could emit via WebSocket here
  // io.to(data.recipient.toString()).emit('notification', notification);
  
  return notification;
};

const sendBulkNotifications = async (recipients, data) => {
  const notifications = recipients.map(recipient => ({
    ...data,
    recipient,
  }));
  
  return await Notification.insertMany(notifications);
};

module.exports = {
  createNotification,
  sendBulkNotifications,
};