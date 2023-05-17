const { Fornecedor } = require("../../services/models/Provider");

describe("Fornecedor", () => {
  it("Deve criar um fornecedor corretamente", () => {
    // Arrange (preparação)
    const idProvider = 1;
    const name = "Fornecedor teste";
    const address = "Rua Paulo Malschitzki, 200";
    const email = "teste@teste.com";
    const phone = "(47) 99115-2348";

    // Act (execução)
    const novoFornecedor = new Fornecedor(
      idProvider,
      name,
      address,
      email,
      phone
    );

    // Assert (verificação)
    expect(novoFornecedor.idProvider).toBe(idProvider);
    expect(novoFornecedor.name).toBe(name);
    expect(novoFornecedor.address).toBe(address);
    expect(novoFornecedor.email).toBe(email);
    expect(novoFornecedor.phone).toBe(phone);
  });
});

describe("Fornecedor", () => {
  it("Deve lançar uma exceção ao criar um fornecedor sem ID", () => {
    // Arrange (preparação)
    const idProvider = null;
    const name = "Fornecedor teste";
    const address = "Rua Paulo Malschitzki, 200";
    const email = "teste@teste.com";
    const phone = "(47) 99115-2348";

    // Act (execução)
    const novoFornecedor = () => new Fornecedor(idProvider, name, address, email, phone);

    // Assert (verificação)
    expect(novoFornecedor).toThrowError("Id Inválido!");
  });
});

describe("Fornecedor", () => {
  it("Deve lançar uma exceção ao criar um fornecedor sem nome", () => {
    // Arrange (preparação)
    const idProvider = 1;
    const name = "";
    const address = "Rua Paulo Malschitzki, 200";
    const email = "teste@teste.com";
    const phone = "(47) 99115-2348";

    // Act (execução)
    const novoFornecedor = () => new Fornecedor(idProvider, name, address, email, phone);

    // Assert (verificação)
    expect(novoFornecedor).toThrowError("Nome Inválido!");
  });
});

describe("Fornecedor", () => {
  it("Deve lançar uma exceção ao criar um fornecedor sem endereço", () => {
    // Arrange (preparação)
    const idProvider = 1;
    const name = "Fornecedor teste";
    const address = "";
    const email = "teste@teste.com";
    const phone = "(47) 99115-2348";

    // Act (execução)
    const novoFornecedor = () => new Fornecedor(idProvider, name, address, email, phone);

    // Assert (verificação)
    expect(novoFornecedor).toThrowError("Endereço Inválido!");
  });
});

describe("Fornecedor", () => {
  it("Deve lançar uma exceção ao criar um fornecedor sem e-mail", () => {
    // Arrange (preparação)
    const idProvider = 1;
    const name = "Fornecedor teste";
    const address = "Rua Paulo Malschitzki, 200";
    const email = "";
    const phone = "(47) 99115-2348";

    // Act (execução)
    const novoFornecedor = () => new Fornecedor(idProvider, name, address, email, phone);

    // Assert (verificação)
    expect(novoFornecedor).toThrowError("E-mail Inválido!");
  });
});

describe("Fornecedor", () => {
  it("Deve lançar uma exceção ao criar um fornecedor sem e-mail", () => {
    // Arrange (preparação)
    const idProvider = 1;
    const name = "Fornecedor teste";
    const address = "Rua Paulo Malschitzki, 200";
    const email = "teste@teste.com";
    const phone = "";

    // Act (execução)
    const novoFornecedor = () => new Fornecedor(idProvider, name, address, email, phone);

    // Assert (verificação)
    expect(novoFornecedor).toThrowError("Telefone Inválido!");
  });
});
