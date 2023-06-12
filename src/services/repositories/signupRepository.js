const db = require("../database/db");

async function insertUser(account) {
  let connection;
  const { user, password, email } = account;
  const sql = "INSERT INTO TBLUser (user, password, email) VALUES (?, ?, ?)";

  try {
    connection = await db.Connect();
    const result = await connection.query(sql, [user, password, email]);
    return result;
  } catch (err) {
    console.error("Error:", err);
    return false;
  } finally {
    if (connection !== null) connection.end();
  }
}

module.exports = {
  insertUser,
};
