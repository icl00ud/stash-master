const db = require("../database/db");

async function getAllProducts() {
  const sqlQuery = "SELECT * FROM TBLProduct";
  const connection = await db.Connect();

  try {
    const results = await connection.query(sqlQuery);
    return results;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    connection.end();
  }
}

async function getProductById(productId) {
  const sqlQuery = "SELECT * FROM TBLProduct WHERE idProduct = ?";
  const connection = await db.Connect();

  try {
    const result = await connection.query(sqlQuery, [productId]);
    return result[0];
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    connection.end();
  }
}

async function insertProduct(product) {
  if (!product) throw new Error();

  const data = {
    name: product.name,
    quantity: product.quantity,
    unit: product.unit,
    price: product.price,
    provider: product.provider,
    dtCreation: new Date().toLocaleString("pt-BR"),
  };

  const sqlQuery =
    "INSERT INTO TBLProduct (nome, qtdEstoque, unidMedida, preco, fornecedor, dtCreation) VALUES (?,?,?,?,?,?)";
  const connection = await db.Connect();
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
  if (!product) throw new Error("Product object is required.");

  let connection;

  try {
    connection = await db.Connect();

    // obter o produto atual do banco de dados
    const [rows] = await connection.query(
      "SELECT * FROM TBLProduct WHERE idProduct = ?",
      [product.idProduct]
    );
    const currentProduct = rows[0];

    if (!currentProduct) throw new Error("Produto inexistente");

    // criar um objeto com as propriedades do produto que foram atualizadas
    const updatedFields = {
      nome: product.name !== currentProduct.nome ? product.name : undefined,
      qtdEstoque:
        product.quantity !== currentProduct.qtdEstoque
          ? product.quantity
          : undefined,
      unidMedida:
        product.unit !== currentProduct.unidMedida ? product.unit : undefined,
      preco: product.price !== currentProduct.preco ? product.price : undefined,
      fornecedor:
        product.provider !== currentProduct.fornecedor
          ? product.provider
          : undefined,
    };

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
    return console.error(`Failed to update product: ${error.message}`);
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

async function deleteProduct(id) {
  if (!id) throw new Error("'id' is null");

  let connection;

  try {
    connection = await db.Connect();
    var sqlQuery = "DELETE FROM TBLProduct WHERE idProduct = ?";
    await connection.query(sqlQuery, id);
  } catch (error) {
    return console.error(`Failed to delete product: ${error.message}`);
  } finally {
    if (connection) connection.end();
  }
}

module.exports = {
  insertProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
};
