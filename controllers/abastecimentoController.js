const banco = require('../db/commands');

module.exports = {
  abastecer: async (req, res) => {
    const { placa, valorLitro, litrosAbastecidos, id_tanque } = req.body;
    const valorAbastecido = litrosAbastecidos * valorLitro;
    const dataAbastecimento = new Date().toISOString().slice(0, 19).replace('T', ' ');

    banco.addAbastecimento(valorAbastecido, placa, valorLitro, litrosAbastecidos, dataAbastecimento, id_tanque, (result, err) => {
      if (err) {
        res.status(500).send({ message: 'error criando abastecimento', sqlErr: err });
      } else {
        res.send({ message: 'abastecimento adicionado' });
      }
    });

  }
}


