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
  try {
    const { user, password } = userObject;
    console.log("CAÍ NO TRY username e password", user, password);
    console.log("CAÍ NO TRY user", userObject);
    const sql = "SELECT user, password FROM TBLUser WHERE user = ? AND password = ?";
    const connection = await db.Connect();
    await new Promise((resolve, reject) => {
      connection.query(sql, [user, password], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
    connection.end();
  } catch {
    const { username, password } = userObject;
    console.log("CAÍ NO CATCH username e password", username, password);
    console.log("CAÍ NO CATCH user", userObject);
    throw new Error("Preencha os campos!");
  }
}

module.exports = {
  insertUser,
  authenticateUser,
};
