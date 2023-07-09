const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "DATAEQUINOX_admin_management",
  password: "starboy",
  port: 5432,
});

module.exports = (text, params) => pool.query(text, params);