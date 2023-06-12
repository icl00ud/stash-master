const db = require("../database/db");

async function findUserByPassAndName(name, password) {
  let connection = await db.Connect();

  try {
    const sql = "SELECT user, password FROM TBLUser WHERE user = ? AND password = ?";
    const [rows, fields] = await connection.execute(sql, [name, password]);

    return rows;
  } catch (err) {
    return err;
  } finally {
    if (connection) connection.end();
  }
}

module.exports = {
    findUserByPassAndName
}