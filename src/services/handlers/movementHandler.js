const db = require("../database/db");

async function getAllMovements() {
  let connection;
  const sqlQuery = "SELECT * FROM TBLMovement";

  try {
    connection = await db.Connect();

    return await connection.query(sqlQuery);
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.end();
  }
}

module.exports = {
    getAllMovements
};
