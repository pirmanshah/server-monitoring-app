const ping = require('ping');
const { connection } = require("../config/database");
const { convertUnixToHumanReadable, getUnixTimestamp } = require('./unix-time');

/*
* Function to ping each server
* This function queries the server data from the database and performs a ping operation on each server.
* It logs the status of each server and updates the server status in the database.
* If a server goes down or comes back up, a notification is sent.
*/
function pingServers() {
  const timestamp = getUnixTimestamp();
  console.log(" ");
  console.log("Running test ping 🚀");

  // Query server data from the database
  connection.query('SELECT id, title, ip_address, status FROM servers', (error, results) => {
      if (error) {
          console.error('Error fetching servers:', error);
          return;
      }

      results.forEach(server => {
          ping.sys.probe(server.ip_address, (isAlive) => {
              const status = isAlive ? 'UP' : 'DOWN';
              const logMessage = `[${convertUnixToHumanReadable(timestamp)}] ${server.title} [${server.ip_address}]: ${status}`;
              
              // Log the status of each server with color coding
              if (isAlive) {
                  console.log('\x1b[32m%s\x1b[0m', logMessage); // Green for UP status
              } else {
                  console.log('\x1b[31m%s\x1b[0m', logMessage); // Red for DOWN status
              }

              // Update server status in the database
              connection.query('UPDATE servers SET status = ?, updatedAt = ? WHERE id = ?', [status, timestamp, server.id], (updateError) => {
                  if (updateError) {
                      console.error('Error updating server status:', updateError);
                  } else {
                      // Send notification if the server status has changed (down or up again)
                      if ((!isAlive && server.status === 'UP') || (isAlive && server.status === 'DOWN')) {
                          sendNotification(server.ip_address, status);
                      }
                  }
              });
          });
      });
  });
}

/*
* Function to send notifications
* This function sends a notification when the status of a server changes.
* It logs a message indicating the new status of the server.
* @param {string} ipAddress - The IP address of the server.
* @param {string} status - The new status of the server (UP or DOWN).
*/
function sendNotification(ipAddress, status) {
  const notificationMessage = `Server ${ipAddress} is now ${status.toUpperCase()}`;
  console.log('\x1b[33m%s\x1b[0m', notificationMessage); // Yellow for notification message
  // Add logic here to send notifications, such as using third-party services like email, SMS, or instant messaging platforms
}

module.exports = {
  pingServers
}