const db = require("../database/db");

async function getAll() {
  let connection;
  const sqlQuery = "SELECT * FROM TBLMovement";

  try {
    connection = await db.Connect();

    return await connection.query(sqlQuery);
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.end();
  }
}

async function getMovReport() {
  let connection;
  const sqlQuery = `SELECT
    m.idMovement,
    p.nome,
    m.quantityMoved,
    m.type,
    m.date,
    m.description,
    ow.name AS origin,
    dw.name AS destination
  FROM
  TBLMovement m
  INNER JOIN TBLWarehouse ow ON m.idOriginWH = ow.idWarehouse
  INNER JOIN TBLWarehouse dw ON m.idDestinationWH = dw.idWarehouse
  LEFT JOIN TBLProduct p ON m.idProduct = p.idProduct;`;

  try {
    connection = await db.Connect();

    return await connection.query(sqlQuery);
  } catch (error) {
    throw error;
  } finally {
    if (connection) connection.end();
  }
}

module.exports = {
  getAll,
  getMovReport
};
