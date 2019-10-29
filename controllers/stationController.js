
const banco = require('../db/commands');

module.exports = {
  getAllPostos: (req, res) => {
    banco.getAllPostos(postos => {
      if (!postos) {
        return res.status(500).send({ message: 'error fetching postos' });
      }
      postos.forEach(posto => {
        posto.bandeira = posto.nome;
        delete posto.nome;
      });
      return res.send(postos);
    });
  }
}