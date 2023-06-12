const _repository = require("../repositories/signupRepository");

async function insertUser(account) {
  if (account.user === "" || account.password === "" || account.email === "")
    return false;

  try {
    const result = await _repository.insertUser(account);

    if (result[0].affectedRows > 0)
      return true;
    return false;
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
}

module.exports = {
  insertUser,
};
