
const banco = require('../db/commands');

module.exports = {
  getAllBandeiras: (req, res) => {
    banco.getAllBandeiras((bandeiras, err) => {
      if (!bandeiras) {
        return res.status(500).send({ message: 'error fetching bandeiras', err: err });
      }
      return res.send(bandeiras);
    });
  }
}