class Produto {
  constructor(
    idProduct,
    nome,
    qtdEstoque,
    unidMedida,
    preco,
    fornecedor,
    dtCreation
  ) {
    if (idProduct === null || idProduct === undefined)
      throw new Error("Código Inválido!")

    if (nome === null || nome === undefined || nome === "")
      throw new Error("Nome Inválido!")

    if (qtdEstoque === null || qtdEstoque === undefined)
      throw new Error("Quantidade Inválida!")

    if (unidMedida === null || unidMedida === undefined || unidMedida === '')
      throw new Error("Unidade de medida Inválida!")

    if (preco === null || preco === undefined)
      throw new Error("Preço Inválido!")

    if (fornecedor === null || fornecedor === undefined || fornecedor === '')
      throw new Error("Fornecedor Inválido!")

    if (dtCreation === null || dtCreation === undefined || dtCreation === '')
      throw new Error("Data de criação Inválida!")

    this.idProduct = idProduct;
    this.nome = nome;
    this.qtdEstoque = qtdEstoque;
    this.unidMedida = unidMedida;
    this.preco = preco;
    this.fornecedor = fornecedor;
    this.dtCreation = dtCreation;
  }
}

module.exports = {
  Produto,
};
