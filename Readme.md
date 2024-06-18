# Server Monitoring App 🖥

This is a Node.js application for monitoring the status of servers by pinging their IP addresses. It retrieves server information from a MySQL database, performs ping tests, and updates the status of servers in the database. It also sends notifications when a server's status changes.

## Requirements

- 🐢 Node.js (version 18 or higher)
- 🐬 MySQL server
- 📝 A `.env` file for storing database credentials (see [Environment Variables](#environment-variables))

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/pirmanshah/server-monitoring-app.git
   ```

2. **Install dependencies:**

   ```bash
   cd server-monitoring-app
   npm install
   ```

3. **Database setup:**

   - Create a MySQL database and import the `database.sql` file to set up the required schema.
   - Create a `.env` file in the root directory of the project and add the following environment variables with your MySQL database credentials:

     ```plaintext
     DB_PORT=3306
     DB_HOST=localhost
     DB_USER=root
     DB_NAME=monitoring
     DB_PASSWORD=

     TELEGRAM_BOT_TOKEN=
     TELEGRAM_CHAT_ID=
     ```

4. **Start the application:**

   - Development mode:

   ```bash
   npm run dev
   ```

   - Production mode:

   ```bash
   npm start
   ```

## Environment Variables

- `DB_PORT`: The port number of the MySQL database server.
- `DB_HOST`: The host address of the MySQL database server.
- `DB_USER`: The username used to authenticate with the MySQL database server.
- `DB_NAME`: The name of the MySQL database.
- `DB_PASSWORD`: The password used to authenticate with the MySQL database server.

## Configuration

- The MySQL database configuration is loaded from the `.env` file using `dotenv`.
- You can adjust other settings, such as the ping interval, in the `server.js` file as needed.

## Usage

- Once the application is running, it will start monitoring the servers listed in the database by performing ping tests.
- Server status updates and notifications will be logged to the console.
- You can add, remove, or update servers in the database as needed, and the application will automatically detect the changes.

## Contact 📞

Created by [Pirmansyah](https://www.pirmansyah.my.id) - feel free to contact me!
