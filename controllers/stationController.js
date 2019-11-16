
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
    const { razao_social, nome_fantasia, longitude, latitude, bandeira_id, cep, estado, cidade, bairro, rua,numero  } = req.body;

    banco.createEndereco(cep,estado,cidade,bairro,rua,numero,(enderecoID,err)=>{
      if(err){
        return res.status(500).send({ message: 'error creating endereço do posto', err: err });
      }

      banco.addPosto(razao_social, nome_fantasia, longitude, latitude, bandeira_id, enderecoID, (result, err) => {
        if (err) {
          return res.status(500).send({ message: 'error creating posto', err: err });
        }
        return res.send({ message: 'posto criado' })
      })

    })


    

  }
}