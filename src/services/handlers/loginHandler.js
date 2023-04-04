const db = require("../database/db");

async function authenticateUser(userObject) {
  let connection = await db.Connect();
  try {
    const { user, password } = userObject;
    const sql =
      "SELECT user, password FROM TBLUser WHERE user = ? AND password = ?";
    const [rows, fields] = await connection.execute(sql, [user, password]);

    if (rows.length > 0) {
      const { user: username, password: passwordHash } = rows[0];
      if (username === user && passwordHash === password) return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error("Preencha os campos!");
  } finally {
    if (connection !== null) connection.end();
  }
}

module.exports = {
  authenticateUser,
};
