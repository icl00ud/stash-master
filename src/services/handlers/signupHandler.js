const db = require("../database/db");

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

module.exports = {
  insertUser,
};
