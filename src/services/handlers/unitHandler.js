const _repository = require("../repositories/unitRepository");

async function getUnitOptions() {
    try {
        return await _repository.getUnitOptions();
    } catch (error) {
        return error;
    }
}

module.exports = {
    getUnitOptions
}