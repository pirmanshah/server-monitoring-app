require('dotenv').config();
const cron = require('node-cron');
const { pingServers } = require('./utils/ping');

/*
* Schedule the cron job to run the pingServers function every 1 minute
* This cron job ensures that the pingServers function is executed every 1 minute to continuously monitor server status.
*/
cron.schedule('*/1 * * * *', async () => {
  await pingServers();
});
