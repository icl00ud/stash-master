const { User, Usuario } = require("../../services/models/User");

describe("Usuário", () => {
  it("Deve criar um novo usuário corretamente", () => {
    // Arrange (preparação)
    const id = 1;
    const user = "Usuário teste";
    const password = "senhateste";
    const email = "teste@teste.com";

    // Act (execução)
    const novoUsuario = new Usuario(id, user, password, email);

    // Assert (verificação)
    expect(novoUsuario.id).toBe(id);
    expect(novoUsuario.user).toBe(user);
    expect(novoUsuario.password).toBe(password);
    expect(novoUsuario.email).toBe(email);
  });
});

describe("Usuário", () => {
  it("Usuário com id vazio lança uma exceção", () => {
    // Arrange (preparação)
    const id = null;
    const user = "Usuário teste";
    const password = "senhateste";
    const email = "teste@teste.com";

    // Act (execução)
    const novoUsuario = () => new Usuario(id, user, password, email);

    // Assert (verificação)
    expect(novoUsuario).toThrowError('Id Inválido!')
  });
});

describe("Usuário", () => {
    it("Usuário com usuário vazio lança uma exceção", () => {
      // Arrange (preparação)
      const id = 1;
      const user = "";
      const password = "senhateste";
      const email = "teste@teste.com";
  
      // Act (execução)
      const novoUsuario = () => new Usuario(id, user, password, email);
  
      // Assert (verificação)
      expect(novoUsuario).toThrowError('Usuário Inválido!')
    });
  });

  describe("Usuário", () => {
    it("Usuário com senha vazia lança uma exceção", () => {
      // Arrange (preparação)
      const id = 1;
      const user = "Usuário teste";
      const password = "";
      const email = "teste@teste.com";
  
      // Act (execução)
      const novoUsuario = () => new Usuario(id, user, password, email);
  
      // Assert (verificação)
      expect(novoUsuario).toThrowError('Senha Inválida!')
    });
  });

  describe("Usuário", () => {
    it("Usuário com e-mail vazio lança uma exceção", () => {
      // Arrange (preparação)
      const id = 1;
      const user = "Usuário teste";
      const password = "senhateste";
      const email = "";
  
      // Act (execução)
      const novoUsuario = () => new Usuario(id, user, password, email);
  
      // Assert (verificação)
      expect(novoUsuario).toThrowError('E-mail Inválido!')
    });
  });
