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
    const { login, senha, nome, CPF, id_posto } = req.body;

    //check if user already exists
    banco.findLogin(login, result => {
      if (result) {
        //user exists
        return res.status(403).json({ error: 'this user already exists' })
      } else {
        //criar endereço com tudo null
        banco.createNullEndereco((enderecoId, err) => {
          //testar erro na criação
          if (!enderecoId) {
            return res.status(500).send({ message: 'error creating user1', error: err });
          }

          //criar pessoa
          const newPessoa = {
            nome,
            CPF,
            endereco_id: enderecoId
          }
          banco.createPessoa(newPessoa, (pessoaId, err) => {
            //testar erro na criação 
            if (!pessoaId) {
              return res.status(500).send({ message: 'error creating user2', error: err });
            }

            //criar usuario 
            const newUser = {
              login,
              senha: util.encrypt(senha),
              pessoa_cpf: CPF,
              posto_id: id_posto
            };
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
          });
        });
      };
    });
  },
  logIn: (req, res) => {
    //generate token
    let token = signToken(req.user);

    //respond with token
    res.status(200).json({ token });
  }
}