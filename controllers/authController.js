const JWT = require('jsonwebtoken');

const JWT_SECRET = '3213131vvvd\sfdfbgb gbz';

const usuario = require('../db/commands');

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
    const { login, senha, pessoa_CPF, posto_razao_social } = req.body;

    //check if user already exists
    usuario.findLogin(login, result => {
      if (result) {
        //user exists
        return res.status(403).json({ error: 'this user already exists' })
      } else {
        // user doesnt exit create new user
        const newUsuario = {
          login,
          senha,
          pessoa_CPF,
          posto_razao_social
        }
        //save new user to db 
        usuario.createUsuario(newUsuario, result => {
          //sign token 
          let token = signToken(newUsuario);

          //respond with token 
          res.json({ token });
        }, err => [
          res.status(500).send({
            message: 'error signing up',
            err
          })
        ])
      }

    });

  },
  logIn: (req, res) => {
    //generate token
    let token = signToken(req.user);

    //respond with token
    res.status(200).json({ token });
  }
}