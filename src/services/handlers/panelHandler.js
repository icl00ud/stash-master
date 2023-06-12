const _repository = require("../repositories/panelRepository");

async function getAllUsers() {
  try {
    return await _repository.getAllUsers();
  } catch (error) {
    return error;
  }
}

async function updateUser(user) {
  if (!user) throw new Error("'user' is null!");

  try {
    await await _repository.updateUser(user);
  } catch (error) {
    return error;
  }
}

async function deleteUserById(idUser) {
  if (!idUser) throw new Error("'idUser' is null!");

  try {
    await _repository.deleteUserById(idUser);
  } catch (error) {
    return error;
  }
}

module.exports = {
  updateUser,
  getAllUsers,
  deleteUserById,
};
