
const banco = require('../db/commands');

module.exports = {
  getAllUsers: (req, res) => {
    banco.getAllUsers((users, err) => {
      if (!users) {
        return res.status(500).send({ message: 'error fetching users', err: err });
      }
      users.forEach(e => delete e.senha);
      return res.send(users);
    });
  },
  deleteOneUser: (req, res) => {
    banco.deleteOneUser(req.params.login, (back, err) => {
      if (!back) {
        return res.status(500).send({ message: 'error deleting user', err: err });
      }
      res.send({ message: "user deleted" });
    });

  }
}