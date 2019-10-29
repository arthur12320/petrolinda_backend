
const banco = require('../db/commands');

module.exports = {
  getAllUsers: (req, res) => {
    banco.getAllUsers(users => {
      if (!users) {
        return res.status(500).send({ message: 'error fetching users' });
      }
      users.forEach(e => delete e.senha);
      return res.send(users);
    });
  },
  deleteOneUser: (req, res) => {
    banco.deleteOneUser(req.params.login, back => {
      if (!back) {
        return res.status(500).send({ message: 'error deleting user' });
      }
      res.send({ message: "user deleted" });
    });

  }
}