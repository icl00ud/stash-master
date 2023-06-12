const db = require("../database/db");

async function getAll() {
    let connection;
    const sqlQuery = "SELECT * FROM TBLCategory";
    try {
        connection = await db.Connect();
        return await connection.query(sqlQuery);
    } catch (error) {
        return error
    } finally {
        if(connection)
            connection.end()
    }
}

module.exports = {
    getAll
}