const ping = require('ping');
const { connection } = require("../config/database");
const { sendNotification } = require('./sendNotification');
const { convertUnixToHumanReadable, getUnixTimestamp } = require('./unix-time');

/*
* Function to ping each server
* This function queries the server data from the database and performs a ping operation on each server.
* It logs the status of each server and updates the server status in the database.
* If a server goes down or comes back up, a notification is sent.
*/
async function pingServers() {
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
              connection.query('UPDATE servers SET status = ?, updatedAt = ? WHERE id = ?', [status, timestamp, server.id], async (updateError) => {
                  if (updateError) {
                      console.error('Error updating server status:', updateError);
                  } else {
                      // Send notification if the server status has changed (down or up again)
                      if ((!isAlive && server.status === 'UP') || (isAlive && server.status === 'DOWN')) {
                          await sendNotification(server.title, server.ip_address, status);
                      }
                  }
              });
          });
      });
  });
}

module.exports = {
  pingServers
}