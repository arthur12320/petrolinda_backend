const bcrypt = require('bcrypt');

module.exports = {
  encrypt: password => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  },
  compare: (hashed, password) => {
    return bcrypt.compareSync(password, hashed);
  }
}