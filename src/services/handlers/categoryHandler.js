const _repository = require("../repositories/categoryRepository");

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
