
const banco = require('../db/commands');

module.exports = {
  listTanques: (req, res) => {
    banco.listTanques(req.params.id, (back, err) => {
      if (err) {
        return res.status(500).send({ message: 'error listing tanques', err: err });
      }
      return res.send(back);
    })
  }
}