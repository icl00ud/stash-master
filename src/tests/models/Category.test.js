const { Categoria } = require("../../services/models/Category");

describe("Categoria", () => {
  it("Deve criar uma categoria corretamente", () => {
    // Arrange (preparação)
    const idCategory = 1;
    const category = "Categoria Teste";
    const description = "Essa é uma descrição de teste";
    const dtCreation = "2023-05-17";

    // Act (execução)
    const novaCategoria = new Categoria(
      idCategory,
      category,
      description,
      dtCreation
    );

    // Assert (verificação)
    expect(novaCategoria.idCategory).toBe(idCategory);
    expect(novaCategoria.category).toBe(category);
    expect(novaCategoria.description).toBe(description);
    expect(novaCategoria.dtCreation).toBe(dtCreation);
  });
});

describe("Categoria", () => {
  it("Deve lançar uma exceção ao criar uma categoria sem ID", () => {
    // Arrange (preparação)
    const idCategory = null;
    const category = "Categoria Teste";
    const description = "Essa é uma descrição de teste";
    const dtCreation = "2023-05-17";

    // Act (execução)
    const novaCategoria = () =>
      new Categoria(idCategory, category, description, dtCreation);

    // Assert (verificação)
    expect(novaCategoria).toThrowError("Id Inválido!");
  });
});

describe("Categoria", () => {
  it("Deve lançar uma exceção ao criar uma categoria sem categoria", () => {
    // Arrange (preparação)
    const idCategory = 1;
    const category = "";
    const description = "Essa é uma descrição de teste";
    const dtCreation = "2023-05-17";

    // Act (execução)
    const novaCategoria = () =>
      new Categoria(idCategory, category, description, dtCreation);

    // Assert (verificação)
    expect(novaCategoria).toThrowError("Categoria Inválida!");
  });
});

describe("Categoria", () => {
  it("Deve lançar uma exceção ao criar uma categoria sem descrição", () => {
    // Arrange (preparação)
    const idCategory = 1;
    const category = "Categoria Teste";
    const description = "";
    const dtCreation = "2023-05-17";

    // Act (execução)
    const novaCategoria = () =>
      new Categoria(idCategory, category, description, dtCreation);

    // Assert (verificação)
    expect(novaCategoria).toThrowError("Descrição Inválida!");
  });
});

describe("Categoria", () => {
  it("Deve lançar uma exceção ao criar uma categoria sem data de criação", () => {
    // Arrange (preparação)
    const idCategory = 1;
    const category = "Categoria Teste";
    const description = "Essa é uma descrição de teste";
    const dtCreation = "";

    // Act (execução)
    const novaCategoria = () =>
      new Categoria(idCategory, category, description, dtCreation);

    // Assert (verificação)
    expect(novaCategoria).toThrowError("Data de criação Inválida!");
  });
});
