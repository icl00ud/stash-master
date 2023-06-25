const _repository = require("../repositories/movementRepository");

async function getAllMovements() {
  try {
    return await _repository.getAll();
  } catch (error) {
    throw error;
  }
}

async function getMovReport() {
  try {
    return await _repository.getMovReport();
  } catch (error) {
    throw error;
  }
}

async function createMovement(mov) {
  try {
    mov.date = new Date().toISOString().replace('T', ' ').substr(0, 19);
    
    return await _repository.createMovement(mov);
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllMovements,
  getMovReport,
  createMovement
};
