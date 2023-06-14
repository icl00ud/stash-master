const _repository = require("../repositories/providerRepository");

async function getAllProviders() {
  try {
    return await _repository.getAll();
  } catch (error) {
    console.log("Mensagem de erro: ", error);
    return error;
  }
}

async function getAutoComplete(name) {
  try {
    return await _repository.getAutoComplete(name);
  } catch (error) {
    console.log("Mensagem de erro: ", error);
    return error;
  }
}

async function getProviderById(idProvider) {
  try {
    return await _repository.getProviderById(idProvider);
  } catch (error) {
    console.error("Mensagem de erro: ", error);
    return error;
  }
}

async function insertProvider(provider) {
  try {
    const result = await _repository.insertProvider(provider);
    if (result[0].affectedRows != 0) return result;
  } catch (error) {
    return error;
  }
}

async function updateProvider(provider) {
  try {
    const [rows] = await _repository.getProviderById(provider.idProvider);
    const currentProvider = rows;
    if (!currentProvider) return;

    // criar um objeto com as propriedades do produto que foram atualizadas
    const updatedFields = {
      idProvider: provider.idProvider,
      name: provider.name !== currentProvider.name ? provider.name : undefined,
      address: provider.address !== currentProvider.address ? provider.address : undefined,
      email: provider.email !== currentProvider.email ? provider.email : undefined,
      phone: provider.phone !== currentProvider.phone ? provider.phone : undefined,
    };

    await _repository.updateProvider(updatedFields);
  } catch (error) {
    return error;
  }
}

async function deleteProviderById(idProvider) {
  try {
    await _repository.deleteProviderById(idProvider);
  } catch (error) {
    return error;
  }
}

module.exports = {
  getAllProviders,
  getAutoComplete,
  getProviderById,
  insertProvider,
  updateProvider,
  deleteProviderById,
};
