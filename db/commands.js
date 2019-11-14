const db = require('./db');

module.exports = {
  createUsuario: async (user, callback) => {
    let sql = 'INSERT INTO usuario SET ?'
    let query = db.query(sql, user, (err, result) => {
      if (err) {
        console.log(err);
        callback(null, err);
      } else {
        callback(result)
      }

    })
  },
  findLogin: (login, callback) => {
    let sql = `SELECT * FROM usuario WHERE login = ${db.escape(login)}`;
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      }
      callback(result[0]);
    })
  },
  getAllUsers: (callback) => {
    let sql = `SELECT * FROM usuario`;
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result)
      }
    })
  },
  createNullEndereco: (callback) => {
    let sql = "INSERT INTO `PetroLinda`.`endereco` () VALUES ()";
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result.insertId)
      }
    })
  },
  createPessoa: (pessoa, callback) => {
    let sql = 'INSERT INTO pessoa SET ?'
    let query = db.query(sql, pessoa, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result.affectedRows)
      }

    })
  },
  deleteOneUser: (login, callback) => {
    let sql = `DELETE FROM usuario WHERE usuario.login=${db.escape(login)}`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(true)
      }

    });
  },
  getAllPostos: (callback) => {
    let sql = `SELECT A.id,A.razao_social,A.nome_fantasia,A.longitude,A.latitude,A.nome_fantasia FROM posto AS A INNER JOIN bandeira AS B ON B.id = A.bandeira_id`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        callback(null, err);
      } else {
        callback(result)
      }
    })
  },
  getAllBandeiras: (callback) => {
    let sql = `SELECT id,nome_fantasia FROM bandeira;`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        callback(null, err);
      } else {
        callback(result)
      }
    })
  }
}

