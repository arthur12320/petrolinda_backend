
const banco = require('../db/commands');

module.exports = {
  getAllPostos: (req, res) => {
    banco.getAllPostos((postos, err) => {
      if (!postos) {
        return res.status(500).send({ message: 'error fetching postos', err: err });
      }
      postos.forEach(posto => {
        posto.bandeira = posto.nome;
        delete posto.nome;
      });
      return res.send(postos);
    });
  },
  addPosto: (req, res) => {
    const { razao_social, nome_fantasia, longitude, latitude, bandeira_id, endereco_id } = req.body;
    banco.addPosto(razao_social, nome_fantasia, longitude, latitude, bandeira_id, endereco_id, (result, err) => {
      if (err) {
        return res.status(500).send({ message: 'error creating posto', err: err });
      }
      return res.send({ message: 'posto criado' })
    })

  }
}