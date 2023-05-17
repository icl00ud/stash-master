const { Movimentacao } = require("../../services/models/Movement");

describe("Movimentação", () => {
  it("Deve criar uma movimentação corretamente", () => {
    // Arrange (preparação)
    const idMovement = 1;
    const date = "2023-05-17";
    const product = "Produto de teste";
    const type = "Entrada";
    const quantity = "50";
    const origin = "Armazém A";
    const destination = "Armazém B";

    // Act (execução)
    const novaMovimentacao = new Movimentacao(idMovement, date, product, type, quantity, origin, destination);

    // Assert (verificação)
    expect(novaMovimentacao.idMovement).toBe(idMovement);
    expect(novaMovimentacao.date).toBe(date);
    expect(novaMovimentacao.product).toBe(product);
    expect(novaMovimentacao.type).toBe(type);
    expect(novaMovimentacao.quantity).toBe(quantity);
    expect(novaMovimentacao.origin).toBe(origin);
    expect(novaMovimentacao.destination).toBe(destination);
  });
});

describe("Movimentação", () => {
  it("Deve lançar uma exceção ao criar uma movimentação sem ID", () => {
    // Arrange (preparação)
    const idMovement = null;
    const date = "2023-05-17";
    const product = "Produto de teste";
    const type = "Entrada";
    const quantity = "50";
    const origin = "Armazém A";
    const destination = "Armazém B";

    // Act (execução)
    const novaMovimentacao = () =>
      new Movimentacao(
        idMovement,
        date,
        product,
        type,
        quantity,
        origin,
        destination
      );

    // Assert (verificação)
    expect(novaMovimentacao).toThrowError("Id Inválido!");
  });
});

describe("Movimentação", () => {
  it("Deve lançar uma exceção ao criar uma movimentação sem data", () => {
    // Arrange (preparação)
    const idMovement = 1;
    const date = "";
    const product = "Produto de teste";
    const type = "Entrada";
    const quantity = "50";
    const origin = "Armazém A";
    const destination = "Armazém B";

    // Act (execução)
    const novaMovimentacao = () =>
      new Movimentacao(
        idMovement,
        date,
        product,
        type,
        quantity,
        origin,
        destination
      );

    // Assert (verificação)
    expect(novaMovimentacao).toThrowError("Data Inválida!");
  });
});

describe("Movimentação", () => {
  it("Deve lançar uma exceção ao criar uma movimentação sem produto", () => {
    // Arrange (preparação)
    const idMovement = 1;
    const date = "2023-05-17";
    const product = "";
    const type = "Entrada";
    const quantity = "50";
    const origin = "Armazém A";
    const destination = "Armazém B";

    // Act (execução)
    const novaMovimentacao = () =>
      new Movimentacao(
        idMovement,
        date,
        product,
        type,
        quantity,
        origin,
        destination
      );

    // Assert (verificação)
    expect(novaMovimentacao).toThrowError("Produto Inválido!");
  });
});

describe("Movimentação", () => {
  it("Deve lançar uma exceção ao criar uma movimentação sem tipo", () => {
    // Arrange (preparação)
    const idMovement = 1;
    const date = "2023-05-17";
    const product = "Produto de teste";
    const type = "";
    const quantity = "50";
    const origin = "Armazém A";
    const destination = "Armazém B";

    // Act (execução)
    const novaMovimentacao = () =>
      new Movimentacao(
        idMovement,
        date,
        product,
        type,
        quantity,
        origin,
        destination
      );

    // Assert (verificação)
    expect(novaMovimentacao).toThrowError("Tipo Inválido!");
  });
});

describe("Movimentação", () => {
  it("Deve lançar uma exceção ao criar uma movimentação sem quantidade", () => {
    // Arrange (preparação)
    const idMovement = 1;
    const date = "2023-05-17";
    const product = "Produto de teste";
    const type = "Saída";
    const quantity = "";
    const origin = "Armazém A";
    const destination = "Armazém B";

    // Act (execução)
    const novaMovimentacao = () =>
      new Movimentacao(
        idMovement,
        date,
        product,
        type,
        quantity,
        origin,
        destination
      );

    // Assert (verificação)
    expect(novaMovimentacao).toThrowError("Quantidade Inválida!");
  });
});

describe("Movimentação", () => {
  it("Deve lançar uma exceção ao criar uma movimentação sem origem", () => {
    // Arrange (preparação)
    const idMovement = 1;
    const date = "2023-05-17";
    const product = "Produto de teste";
    const type = "Saída";
    const quantity = "50";
    const origin = "";
    const destination = "Armazém B";

    // Act (execução)
    const novaMovimentacao = () =>
      new Movimentacao(
        idMovement,
        date,
        product,
        type,
        quantity,
        origin,
        destination
      );

    // Assert (verificação)
    expect(novaMovimentacao).toThrowError("Origem Inválida!");
  });
});

describe("Movimentação", () => {
  it("Deve lançar uma exceção ao criar uma movimentação sem destino", () => {
    // Arrange (preparação)
    const idMovement = 1;
    const date = "2023-05-17";
    const product = "Produto de teste";
    const type = "Saída";
    const quantity = "50";
    const origin = "Armazém A";
    const destination = "";

    // Act (execução)
    const novaMovimentacao = () =>
      new Movimentacao(
        idMovement,
        date,
        product,
        type,
        quantity,
        origin,
        destination
      );

    // Assert (verificação)
    expect(novaMovimentacao).toThrowError("Destino Inválido!");
  });
});
