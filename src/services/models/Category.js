class Categoria {
  constructor(idCategory, category, description, dtCreation) {
    if (idCategory === null || idCategory === undefined || idCategory === "")
      throw new Error("Id Inválido!");

    if (category === null || category === undefined || category === "")
      throw new Error("Categoria Inválida!");

    if (description === null || description === undefined || description === "")
      throw new Error("Descrição Inválida!");

    if (dtCreation === null || dtCreation === undefined || dtCreation === "")
      throw new Error("Data de criação Inválida!");

    this.idCategory = idCategory;
    this.category = category;
    this.description = description;
    this.dtCreation = dtCreation;
  }
}

module.exports = {
  Categoria,
};
