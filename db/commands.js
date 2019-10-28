const db = require('./db');

module.exports = {
  createUsuario: async (user, callback, error) => {
    let sql = 'INSERT INTO usuario SET ?'
    let query = db.query(sql, user, (err, result) => {
      if (err) {
        error(err);
      } else {
        callback(result)
      }

    })
  },
  findLogin: (login, callback) => {
    let sql = `SELECT * FROM usuario WHERE login = ${db.escape(login)}`;
    db.query(sql, (err, result) => {
      if (err) {
        callback(null);
      }
      callback(result[0]);
    })
  },
  getAllUsers: (callback) => {
    let sql = `SELECT B.nome,A.* FROM usuario AS A INNER JOIN pessoa AS B ON B.cpf = A.pessoa_cpf`;
    db.query(sql, (err, result) => {
      if (err) {
        callback(null);
      } else {
        callback(result)
      }
    })
  }
}

