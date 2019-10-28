
const User = require('../db/commands');

module.exports = {
  getAllUsers: (req, res) => {
    User.getAllUsers(users => {
      if (!users) {
        return res.status(500).send({ message: 'error fetching users' });
      }
      users.forEach(e => delete e.senha);
      return res.send(users);
    });
  }
}