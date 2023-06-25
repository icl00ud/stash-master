const db = require("../database/db");

async function getWarehouseOptions() {
    let connection;
    const sqlQuery = "SELECT idWarehouse AS 'id', name AS 'text' FROM TBLWarehouse"

    try {
        connection = await db.Connect();
        return await connection.query(sqlQuery);
    } catch (error) {
        return error;
    } finally {
        if (connection) connection.end();
    }
}

module.exports = {
    getWarehouseOptions
}