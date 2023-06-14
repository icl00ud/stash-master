const db = require("../database/db");

async function getAll() {
  let connection;
  const sqlQuery = "SELECT * FROM TBLStock";

  try {
    connection = await db.Connect();
    const result = await connection.query(sqlQuery);
    return result;
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

async function getReport() {
  let connection;
  const sqlQuery = `SELECT
  A.idStock as 'stockId',
  B.nome AS 'productName',
  B.preco AS 'productPrice',
  D.prefixo AS 'unit',
  A.quantity AS 'stockedQuantity',
  C.name AS 'warehouseName',
  C.address AS 'warehouseAddress'
FROM
  TBLStock A
  LEFT JOIN TBLProduct B ON A.idProduct = B.idProduct
  LEFT JOIN TBLWarehouse C ON A.idWarehouse = C.idWarehouse
  LEFT JOIN TBLMedida D ON B.idMedida = D.idMedida`;

  try {
    connection = await db.Connect();
    const result = await connection.query(sqlQuery);
    return result;
  } catch (error) {
    return error;
  } finally {
    if (connection) connection.end();
  }
}

module.exports = {
  getAll,
  getReport,
};
