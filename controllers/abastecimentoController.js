const banco = require('../db/commands');

module.exports = {
  abastecer: async (req, res) => {
    const { placa, valorLitro, litrosAbastecidos, id_tanque } = req.body;
    const valorAbastecido = litrosAbastecidos * valorLitro;
    const dataAbastecimento = new Date().toISOString().slice(0, 19).replace('T', ' ');

    banco.addAbastecimento(valorAbastecido, placa, valorLitro, litrosAbastecidos, dataAbastecimento, id_tanque, (result, err) => {
      if (err) {
        return res.status(500).send({ message: 'error criando abastecimento', sqlErr: err });
      }
      return res.send({ message: 'abastecimento adicionado', repsonse: result });

    });

  },
  listLatests: async (req, res) => {
    banco.lastAbastecimentos((back, err) => {
      if (err) {
        return res.status(500).send({ message: 'erro listando abastecimentos', sqlErr: err });
      }

      return res.send(back);

    })
  }
}


