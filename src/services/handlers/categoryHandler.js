const db = require("../database/db");

async function getAllCategories() {
  let connection;
  const sqlQuery = "SELECT * FROM TBLCategory";

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
  getAllCategories
};
