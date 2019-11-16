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
  getAllEnderecos: (callback)=>{
    let sql = `SELECT * FROM endereco`;
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      }
      callback(result);
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
  createEndereco: (cep,estado,cidade,bairro,rua,numero,callback) => {
    let newEndereco = {
      cep,
      estado,
      bairro,
      cidade,
      rua,
      numero
    }
    let sql = "INSERT INTO `PetroLinda`.`endereco` SET ?";
    db.query(sql,newEndereco, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result.insertId)
      }
    })
  },
  // createPessoa: (pessoa, callback) => {
  //   let sql = 'INSERT INTO pessoa SET ?'
  //   let query = db.query(sql, pessoa, (err, result) => {
  //     if (err) {
  //       callback(null, err);
  //     } else {
  //       callback(result.affectedRows)
  //     }

  //   })
  // },
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
  getAllAbastecimentos: (callback)=>{
    let sql = `SELECT * from abastecimentos`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        callback(null, err);
      } else {
        callback(result)
      }
    })
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
  },
  addAbastecimento: (valorPago, placa, valorLitro, litrosAbastecidos, dataAbastecimento, id_tanque, callback) => {
    let sql = `CALL PetroLinda.secure_insert_abastecimento(${db.escape(valorPago)},${db.escape(placa)},${db.escape(valorLitro)},${db.escape(litrosAbastecidos)},${db.escape(dataAbastecimento)},${db.escape(id_tanque)})`
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result);
      }
    });
  },
  updateUsuario: (id, nome, callback) => {
    let sql = `UPDATE PetroLinda.usuario SET nome = ${db.escape(nome)} WHERE (login = ${db.escape(id)});`;
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result);
      }
    });
  },
  addPosto: (razao_social, nome_fantasia, longitude, latitude, bandeira_id, endereco_id, callback) => {
    let sql = `CALL cadastrar_posto(${db.escape(razao_social)},${db.escape(nome_fantasia)},${db.escape(longitude)},${db.escape(latitude)},${db.escape(bandeira_id)},${db.escape(endereco_id)})`;
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result);
      }
    });
  },
  listTanques: (postoid, callback) => {
    let sql = `SELECT A.id,B.nome
    FROM tanque AS A
    INNER JOIN combustivel AS B
    ON A.combustivel_id = B.id
    AND A.posto_id = ${db.escape(postoid)};`
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result);
      }
    });

  },
  lastAbastecimentos: (callback) => {
    let sql = `SELECT * from abastecimentos ORDER BY abastecimentos.abastecimentos_id DESC LIMIT 100;`;
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result);
      }
    });
  },
  listAllTanques: (callback) => {
    let sql = `SELECT * from tanque`;
    db.query(sql, (err, result) => {
      if (err) {
        callback(null, err);
      } else {
        callback(result);
      }
    });
  }
}

