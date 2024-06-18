const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const chatId = process.env.TELEGRAM_CHAT_ID;


/*
* Function to send notifications
* This function sends a notification when the status of a server changes.
* It logs a message indicating the new status of the server.
* @param {string} serverName - The Name of the server.
* @param {string} ipAddress - The IP address of the server.
* @param {string} status - The new status of the server (UP or DOWN).
*/
const sendNotification = async (serverName, ipAddress, status) => {
  try {
      const statusEmoji = status.toUpperCase() === 'UP' ? '🟢' : '🔴';
      const notificationMessage = `${statusEmoji} ${serverName} [${ipAddress}] is now ${status.toUpperCase()}.`;
      console.log('\x1b[33m%s\x1b[0m', notificationMessage);
      await bot.telegram.sendMessage(chatId, notificationMessage);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

module.exports = {
  sendNotification
}