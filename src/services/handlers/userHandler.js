const db = require("../database/db");
const bcrypt = require("bcrypt");

async function insertUser(account) {
  if (!account) return new Error();

  const { user, password, email } = account;
  const sql = "INSERT INTO TBLUser (user, password, email) VALUES (?, ?, ?)";
  const connection = await db.Connect();
  await new Promise((resolve, reject) => {
    connection.query(sql, [user, password, email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
  connection.end();
}

async function authenticateUser(userObject) {
  let connection = await db.Connect();
  try {
    const { user, password } = userObject;
    const sql = "SELECT user, password FROM TBLUser WHERE user = ? AND password = ?";
    const [rows, fields] = await connection.execute(sql, [user, password]);

    if (rows.length > 0) {
      const { user: username, password: passwordHash } = rows[0];
      if (username === user && passwordHash === password)
        return true
    } else {
      return false
    }
  } catch (err) {
    throw new Error("Preencha os campos!");
  } finally {
    if (connection !== null) connection.end();
  }
}

module.exports = {
  insertUser,
  authenticateUser,
};
