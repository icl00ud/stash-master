const db = require("../database/db");

async function getUnitOptions() {
    let connection;
    const sqlQuery = "SELECT idMedida, nome FROM TBLMedida"

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