const _repository = require("../repositories/categoryRepositorie");

async function getAllCategories() {
  try {
    return await _repository.getAll();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCategories
};
