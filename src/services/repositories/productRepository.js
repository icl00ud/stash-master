const db = require("../database/db");

async function getAll() {
  const sqlQuery = "SELECT * FROM TBLProduct";
  const connection = await db.Connect();

  try {
    const results = await connection.query(sqlQuery);
    return results;
  } catch (err) {
    return err;
  } finally {
    connection.end();
  }
}

async function getProductByName(productName) {
  let connection;
  const sqlQuery = "SELECT * FROM TBLProduct WHERE nome = ?";

  try {
    connection = await db.Connect();
    return await connection.query(sqlQuery, productName);
  } catch (error) {
    return error
  } finally {
    if(connection) connection.end()
  }
}

async function getProductReport() {
  const connection = await db.Connect();
  const sqlQuery = `SELECT
    A.idProduct,
    A.nome,
    B.nome AS 'unidMedida',
    A.preco,
    A.dtCreation
  FROM
    TBLProduct A
    LEFT JOIN TBLMedida B ON A.idMedida = B.idMedida`;

  try {
    return await connection.query(sqlQuery);
  } catch (err) {
    return err;
  } finally {
    connection.end();
  }
}

async function getProductById(productId) {
  const connection = await db.Connect();
  const sqlQuery = "SELECT * FROM TBLProduct WHERE idProduct = ?";

  try {
    return await connection.query(sqlQuery, [productId]);
  } catch (err) {
    return err;
  } finally {
    if (connection !== null) connection.end();
  }
}

async function insertProduct(data) {
  const connection = await db.Connect();
  const sqlQuery =
    "INSERT INTO TBLProduct (idCategory, idProvider, idMedida, nome, preco, dtCreation) VALUES (?,?,?,?,?,?)";

  try {
    await connection.query(sqlQuery, Object.values(data));
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    connection.end();
  }
}

async function updateProduct(product) {
  let connection;

  try {
    connection = await db.Connect();

    // montar a cláusula SET e o array de valores para a atualização
    const setClause = Object.entries(updatedFields)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => `${key} = ?`)
      .join(", ");

    const values = Object.entries(updatedFields)
      .filter(([_, value]) => value !== undefined)
      .map(([_, value]) => value);

    const sqlQuery = `UPDATE TBLProduct SET ${setClause} WHERE idProduct = ?`;
    await connection.query(sqlQuery, [...values, product.idProduct]);
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function deleteProduct(id) {
  let connection;
  var sqlQueryCheck =
    "SELECT COUNT(*) AS count FROM TBLProduct WHERE idProduct = ?";
  var sqlQuery = "DELETE FROM TBLProduct WHERE idProduct = ?";

  try {
    connection = await db.Connect();
    const [rows] = await connection.query(sqlQueryCheck, id);

    const count = rows[0].count;
    if (count === 0) throw new Error(`Product with id ${id} does not exist`);

    await connection.query(sqlQuery, id);
    return true;
  } catch (error) {
    console.error(`Failed to delete product: ${error.message}`);
    return false;
  } finally {
    if (connection) connection.end();
  }
}

module.exports = {
  getAll,
  getProductReport,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProductByName
};
