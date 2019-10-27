const db = require('./db');

module.exports = {
  createUsuario: async (user, callback, error) => {
    let sql = 'INSERT INTO usuario SET ?'
    let query = db.query(sql, user, (err, result) => {
      if (err) {
        return error(err);
      }
      return callback(result)
    })
  },
  findLogin: (login, callback) => {
    let sql = `SELECT * FROM usuario WHERE login = ${db.escape(login)}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        result = null;
        callback(null);
      }
      callback(result[0]);
    })
  }
}