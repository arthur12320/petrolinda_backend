const mysql = require('mysql');

//create connection to db
const db = mysql.createConnection({
  host: '35.203.75.224',
  user: 'root',
  password: 'trabbancoroot',
  database: 'PetroLinda' //needs to be a valid database already created;
});


module.exports = db;