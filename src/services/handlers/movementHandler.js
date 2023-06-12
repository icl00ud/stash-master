const db = require("../database/db");

async function getAllMovements() {
  let connection;
  const sqlQuery = 
  `SELECT
  m.idMovement,
  p.nome,
  m.quantityMoved,
  m.type,
  m.date,
  m.description,
  ow.name AS origin,
  dw.name AS destination
FROM
tblmovement m
INNER JOIN tblwarehouse ow ON m.idOriginWH = ow.idWarehouse
INNER JOIN tblwarehouse dw ON m.idDestinationWH = dw.idWarehouse
LEFT JOIN tblproduct p ON m.idProduct = p.idProduct;`;

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
  getAllMovements,
};