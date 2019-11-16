
const banco = require('../db/commands');

module.exports = {
  getAllEnderecos: (req, res) => {
    banco.getAllEnderecos((enderecos, err) => {
      if (err) {
        return res.status(500).send({ message: 'error fetching endereços', err: err });
      }
      return res.send(enderecos);
    });
  }
}