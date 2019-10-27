const mysql = require('mysql');

//create connection to db
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'petrolinda' //needs to be a valid database already created;
});


module.exports = db;