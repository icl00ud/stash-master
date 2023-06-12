const db = require("../database/db");

async function getAll() {
  const connection = await db.Connect();
  const sqlQuery = "SELECT * FROM TBLProvider";

  try {
    const result = await connection.query(sqlQuery);
    return result[0];
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function getProviderById(idProvider) {
  const connection = await db.Connect();
  const sqlQuery = "SELECT * FROM TBLProvider WHERE idProvider = ?";

  try {
    const result = await connection.query(sqlQuery, idProvider);
    return result[0];
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function insertProvider(provider) {
  const connection = await db.Connect();
  const sqlQuery = "INSERT INTO TBLProvider (name, address, email, phone) VALUES (?, ?, ?, ?)";

  try {
    const { name, address, email, phone } = provider;
    return await connection.query(sqlQuery, [name, address, email, phone]);
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function updateProvider(provider) {
  let connection;

  try {
    connection = await db.Connect();
    const setClause = Object.entries(provider)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => `${key} = ?`)
      .join(", ");

    const values = Object.entries(provider)
      .filter(([_, value]) => value !== undefined)
      .map(([_, value]) => value);

    const sqlQuery = `UPDATE TBLProvider SET ${setClause} WHERE idProvider = ?`;
    await connection.query(sqlQuery, [...values, provider.idProvider]);
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function deleteProviderById(idProvider) {
  const connection = await db.Connect();
  const sqlQuery = "DELETE FROM TBLProvider WHERE idProvider = ?";
  try {
    connection.query(sqlQuery, idProvider);
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

module.exports = {
  getAll,
  getProviderById,
  insertProvider,
  updateProvider,
  deleteProviderById,
};
