const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	host: process.env.DBHOST,
	port: process.env.DBPORT,
	database: process.env.DBDATABASE
});

module.exports = pool;
