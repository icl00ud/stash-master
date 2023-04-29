const db = require("../database/db");

async function insertUser(account) {
  if (account.user === "" || account.password === "" || account.email === "")
    return false;

  const { user, password, email } = account;
  const sql = "INSERT INTO TBLUser (user, password, email) VALUES (?, ?, ?)";

  try {
    const connection = await db.Connect();
    const result = await connection.query(sql, [user, password, email]);
    connection.end();

    if(result[0].affectedRows > 0){
      return true;
    }
    return false;

  } catch(err) {
    console.error("Error:", err);
    return false;
  }
}

module.exports = {
  insertUser,
};