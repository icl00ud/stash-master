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
  // Validação dos campos obrigatórios
  if (!product || !product.name || !product.quantity || !product.unit || !product.price || !product.provider)
    throw new Error("Todos os campos devem ser preenchidos.");

  // Validação do nome do produto único
  const existingProduct = await _repository.getProductByName(product.name);
  if (existingProduct)
    throw new Error("Já existe um produto com esse nome cadastrado.");

  // Validação da quantidade não negativa
  if (product.quantity < 0)
    throw new Error("A quantidade do produto não pode ser negativa.");

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
    // Obter o produto atual do banco de dados
    const [rows] = await _repository.getProductById(product.idProduct);
    const currentProduct = rows[0];

    if (!currentProduct) throw new Error("Produto inexistente");

    // Criar um objeto com as propriedades do produto que foram atualizadas
    const updatedFields = {};

    if (product.name && product.name !== currentProduct.nome) {
      // Validação do nome do produto único
      const existingProduct = await _repository.getProductByName(product.name);
      if (existingProduct)
        throw new Error("Já existe um produto com esse nome cadastrado.");
      updatedFields.nome = product.name;
    }

    if (product.quantity !== undefined && product.quantity !== currentProduct.qtdEstoque) {
      // Validação da quantidade não negativa
      if (product.quantity < 0)
        throw new Error("A quantidade do produto não pode ser negativa.");
      updatedFields.qtdEstoque = product.quantity;
    }

    if (product.unit && product.unit !== currentProduct.unidMedida) {
      updatedFields.unidMedida = product.unit;
    }

    if (product.price !== undefined && product.price !== currentProduct.preco) {
      updatedFields.preco = product.price;
    }

    if (product.provider && product.provider !== currentProduct.fornecedor) {
      updatedFields.fornecedor = product.provider;
    }

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
