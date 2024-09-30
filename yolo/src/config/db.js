require('dotenv').config();
const sql = require('mssql/msnodesqlv8');

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  driver: 'msnodesqlv8',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    instanceName: process.env.DB_INSTANCE_NAME,
    trustedConnection: process.env.DB_TRUSTED_CONNECTION === 'true'
  }
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
