const banco = require('../db/commands');

module.exports = {
  makeAbastecimento: (req, res) => {
    const { placa, valorLitro, tanqueId } = req.body;
    banco.abastecer((users, err) => {
      if (!users) {
        return res.status(500).send({ message: 'error fetching users', err: err });
      }
      users.forEach(e => delete e.senha);
      return res.send(users);
    });
  }
}