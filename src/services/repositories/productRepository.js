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

async function getProductOptions() {
  const connection = await db.Connect();
  const sqlQuery = "SELECT idProduct AS 'id', nome AS 'text' FROM TBLProduct";

  try {
    return await connection.query(sqlQuery);
  } catch (err) {
    return err;
  } finally {
    if (connection) connection.end();
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
    if (connection) connection.end();
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
  const sqlQuery = `UPDATE TBLProduct SET 
    idProduct = ${product.idProduct},
    idCategory = ${product.categoryId},
    idProvider = ${product.providerId},
    idMedida = ${product.unitId},
    nome = '${product.name}',
    preco = '${product.price}'
    WHERE idProduct = ${product.idProduct}`;
    
  try {
    connection = await db.Connect();

    await connection.query(sqlQuery);
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function deleteProduct(id) {
  let connection;
  var sqlQuery = "DELETE FROM TBLProduct WHERE idProduct = ?";

  try {
    connection = await db.Connect();

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
  getProductOptions,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProductByName
};
