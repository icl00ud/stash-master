const _repository = require("../repositories/categoryRepository");

async function getAllCategories() {
  try {
    return await _repository.getAll();
  } catch (error) {
    throw error;
  }
}

async function getCategoryReport() {
  try {
    return await _repository.getAll();
  } catch (error) {
    throw error;
  }
}

async function getSelectOptions() {
  try {
    return await _repository.getCategoryNames();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCategories,
  getCategoryReport,
  getSelectOptions
};
