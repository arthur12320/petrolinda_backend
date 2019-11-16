const JWT = require('jsonwebtoken');

const JWT_SECRET = '3213131vvvd\sfdfbgb gbz';

const banco = require('../db/commands');
const util = require('../utilites/cripto');

signToken = user => {
  return token = JWT.sign({
    iss: 'arhtur',
    sub: user.login,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res) => {
    //pegar login, senha, pessoa_CPF e posto_razao_social do body
    const { login, senha, nome, id_posto } = req.body;

    //criar usuario
    const newUser = {
      login,
      senha: util.encrypt(senha),
      nome,
      posto_id: id_posto
    }

    banco.createUsuario(newUser, (result, err) => {
      //testar erro de criação
      if (!result) {
        return res.status(500).send({ message: 'error creating user3', error: err });
      }

      //sign token 
      let token = signToken(newUser);

      //respond with token 
      return res.json({ token });
    });

  },
  logIn: (req, res) => {
    //generate token
    let token = signToken(req.user);

    //respond with token
    res.status(200).json({ token });
  }
}