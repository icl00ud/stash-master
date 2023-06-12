const _repository = require("../repositories/productRepository");

async function getAllProducts() {
  try {
    return await _repository.getAll();
  } catch (err) {
    return err;
  }
}

async function getProductTab() {
  try {
    return await _repository.getProductTab();
  } catch (err) {
    return err;
  }
}

async function getProductById(productId) {
  try {
    const result = await _repository.getProductById(productId);

    if (result[0].length === 0) {
      const error = new Error("Produto não encontrado");
      error.statusCode = 404;
      throw error;
    }

    return result[0];
  } catch (err) {
    return err;
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

  try {
    await _repository.insertProduct(data);
  } catch (err) {
    return err;
  }
}

async function updateProduct(product) {
  if (!product) throw new Error("Product object is required.");

  try {
    // obter o produto atual do banco de dados
    const [rows] = await _repository.getProductById(product.idProduct);
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

    await _repository.updateProduct(updatedFields);
  } catch (error) {
    return error;
  }
}

async function deleteProduct(id) {
  if (!id) throw new Error("'id' is null");

  try {
    const isDeleted = await _repository.deleteProduct(id);
    if (isDeleted) return true;
    return false;
  } catch (error) {
    console.error(`Failed to delete product: ${error.message}`);
    return false;
  }
}

module.exports = {
  insertProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getProductTab,
};
