require('dotenv').config();
const cron = require('node-cron');
const { pingServers } = require('./utils/ping');

/*
* Schedule the cron job to run the pingServers function every 30 seconds
* This cron job ensures that the pingServers function is executed every 30 seconds to continuously monitor server status.
*/
cron.schedule('*/30 * * * * *', pingServers);
