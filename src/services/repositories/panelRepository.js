const db = require("../database/db");

async function getAllUsers() {
  let connection;

  try {
    connection = await db.Connect();
    const sqlQuery = "SELECT * FROM TBLUser";

    return await connection.query(sqlQuery);
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function updateUser(newUser) {
  let connection;
  const sqlQuery = "UPDATE FROM TBLUser SET user = ?, password = ?, email = ? WHERE id = ?";
  const { id, user, password, email } = newUser;

  try {
    connection = await db.Connect();

    await connection.query(sqlQuery, [user, password, email, id]);
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function deleteUserById(idUser) {
  let connection;

  try {
    connection = await db.Connect();
    const sqlQuery = "DELETE FROM TBLUser WHERE id = ?";

    await connection.query(sqlQuery, idUser);
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

module.exports = {
  getAllUsers,
  updateUser,
  deleteUserById,
};
