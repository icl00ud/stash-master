const _repository = require("../repositories/movementRepository");

async function getAllMovements() {
  try {
    return await _repository.getAll();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllMovements,
};
