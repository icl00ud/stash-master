const _repository = require("../repositories/stockRepository");

async function getAllStocks() {
  try {
    return await _repository.getAll();
  } catch (error) {
    return error;
  }
}

async function getReport() {
  try {
    return await _repository.getReport();
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllStocks,
  getReport
};
