const mysql = require('mysql2');

/*
* MySQL database configuration
* This configuration object holds the necessary credentials and database information
* required to connect to the MySQL database.
*/
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

/*
* Create a database connection
* Establish a connection to the MySQL database using the configuration provided.
*/
const connection = mysql.createConnection(dbConfig);


module.exports = {
  dbConfig,
  connection
}