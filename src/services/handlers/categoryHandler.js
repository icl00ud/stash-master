const _repository = require("../repositories/categoryRepository");

async function getAllCategories() {
  try {
    return await _repository.getAll();
  } catch (error) {
    return error;
  }
}

async function getCategoryReport() {
  try {
    return await _repository.getAll();
  } catch (error) {
    return error;
  }
}

async function getSelectOptions() {
  try {
    return await _repository.getCategoryNames();
  } catch (error) {
    return error;
  }
}

async function createCategory(category) {
  try {
    const data = {
      category: category.category,
      description: category.description,
      dtCreation: new Date().toISOString().replace('T', ' ').substr(0, 19)
    };

    return await _repository.createCategory(data);
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllCategories,
  getCategoryReport,
  getSelectOptions,
  createCategory
};
