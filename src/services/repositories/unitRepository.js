const db = require("../database/db");

async function getUnitOptions() {
    let connection;
    const sqlQuery = "SELECT idMedida AS 'id', nome AS 'text' FROM TBLMedida"

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
    getUnitOptions
}