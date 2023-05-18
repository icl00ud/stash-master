const { Error } = require("sequelize");
const db = require("../database/db");

async function getAllProviders() {
  const connection = await db.Connect();
  const sqlQuery = "SELECT * FROM TBLProvider";

  try {
    const result = await connection.query(sqlQuery);
    return result[0];
  } catch (error) {
    console.log("Mensagem de erro: ", error);
    throw new Error("Falha ao buscar os fornecedores");
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
    console.error("Mensagem de erro: ", error);
    throw new Error("Falha ao buscar o fornecedor");
  } finally {
    if (connection) connection.end();
  }
}

async function insertProvider(provider) {
  const connection = await db.Connect();
  const sqlQuery =
    "INSERT INTO TBLProvider (name, address, email, phone) VALUES (?, ?, ?, ?)";

  try {
    const { name, address, email, phone } = provider;
    const result = await connection.query(sqlQuery, [
      name,
      address,
      email,
      phone,
    ]);
    if (result[0].affectedRows != 0) {
      return result;
    }
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.end();
  }
}

async function updateProvider(provider) {
  const connection = await db.Connect();

  try {
    const [rows] = await connection.query("SELECT * FROM TBLProvider WHERE idProvider = ?", provider.idProvider);
    const currentProvider = rows;
    if (!currentProvider) return;

    // criar um objeto com as propriedades do produto que foram atualizadas
    const updatedFields = {
      name: provider.name !== currentProvider.name ? provider.name : undefined,
      address: provider.address !== currentProvider.address? provider.address: undefined,
      email: provider.email !== currentProvider.email ? provider.email : undefined,
      phone: provider.phone !== currentProvider.phone ? provider.phone : undefined,
    };

    const setClause = Object.entries(updatedFields).filter(([_, value]) => value !== undefined).map(([key]) => `${key} = ?`).join(", ");
    const values = Object.entries(updatedFields).filter(([_, value]) => value !== undefined).map(([_, value]) => value);

    const sqlQuery = `UPDATE TBLProvider SET ${setClause} WHERE idProvider = ?`;
    await connection.query(sqlQuery, [...values, provider.idProvider]);
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function deleteProviderById(idProvider) {
    const connection = await db.Connect()
    const sqlQuery = 'DELETE FROM TBLProvider WHERE idProvider = ?'
    try {
        connection.query(sqlQuery, idProvider)
    } catch (error) {
        throw error
    } finally {
        if(connection)
            connection.end()
    }
}

module.exports = {
  getAllProviders,
  getProviderById,
  insertProvider,
  updateProvider,
  deleteProviderById
};
