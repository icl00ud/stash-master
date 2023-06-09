const _repository = require("../repositories/productRepository");

async function getAllProducts() {
  try {
    const response = await _repository.getAll();
    response[0].forEach(item => {
      // Formatação do campo dtCreation
      const formattedDtCreation = new Date(item.dtCreation).toLocaleString("pt-BR");

      // Atualiza o campo dtCreation no próprio objeto
      item.dtCreation = formattedDtCreation;
    });

    return response;
  } catch (err) {
    return err;
  }
}

async function getProductReport() {
  try {
    const response = await _repository.getProductReport();
    response[0].forEach(item => {
      // Formatação do campo dtCreation
      const formattedDtCreation = new Date(item.dtCreation).toLocaleString("pt-BR");

      // Atualiza o campo dtCreation no próprio objeto
      item.dtCreation = formattedDtCreation;
    });

    return response;
  } catch (err) {
    return err;
  }
}

async function getProductOptions() {
  try {
    return await _repository.getProductOptions();
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
  if (!product || !product.name || !product.unitId || !product.price || !product.providerId || !product.categoryId)
    throw new Error("Todos os campos devem ser preenchidos.");

  // Validação do nome do produto único
  const existingProduct = await _repository.getProductByName(product.name);
  console.log(existingProduct[0])
  if (existingProduct[0].length > 0)
    throw new Error("Já existe um produto com esse nome cadastrado.");

  // Validação da quantidade não negativa
  if (product.quantity < 0)
    throw new Error("A quantidade do produto não pode ser negativa.");

  const data = {
    categoryId: product.categoryId,
    providerId: product.providerId,
    unitId: product.unitId,
    name: product.name,
    price: product.price,
    dtCreation: new Date().toISOString().replace('T', ' ').substr(0, 19),
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

    await _repository.updateProduct(product);
  } catch (error) {
    return error;
  }
}

async function deleteProduct(id) {
  if (!id) throw new Error("'id' is null");
  console.log(id)
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
  getProductReport,
  getProductOptions,
};
