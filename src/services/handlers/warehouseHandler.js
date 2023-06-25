const _repository = require("../repositories/warehouseRepository");

async function getWarehouseOptions() {
    try {
        return await _repository.getWarehouseOptions();
    } catch (error) {
        return error;
    }
}

module.exports = {
    getWarehouseOptions
}