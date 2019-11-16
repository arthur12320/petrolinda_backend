
const banco = require('../db/commands');

module.exports = {
  getAllEnderecos: (req, res) => {
    banco.getAllEnderecos((enderecos, err) => {
      if (err) {
        return res.status(500).send({ message: 'error fetching endereços', err: err });
      }
      return res.send(enderecos);
    });
  },
  getAllAbastecimentos: (req,res)=>{
    banco.getAllAbastecimentos((abastecimentos, err) => {
      if (err) {
        return res.status(500).send({ message: 'error fetching abastecimentos', err: err });
      }
      return res.send(abastecimentos);
    });
  },
  getAllTanques: (req,res)=>{
    banco.listAllTanques((tanques, err) => {
      if (err) {
        return res.status(500).send({ message: 'error fetching tanques', err: err });
      }
      return res.send(tanques);
    });
  }
}