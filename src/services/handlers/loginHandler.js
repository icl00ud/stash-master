const _repository = require("../repositories/loginRepository");

async function authenticateUser(req) {
  try {
    const { user, password } = req;
    const userInDB = await _repository.findUserByPassAndName(user, password);

    if (userInDB.length > 0) {
      const { user: username, password: passwordHash } = rows[0];
      if (username === user && passwordHash === password) 
        return true;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
}

module.exports = {
  authenticateUser,
};
