const { Produto } = require('../../services/models/Product')
 
describe('Produto', () => {
  it('Deve criar um novo produto corretamente', () => {
    // Arrange (preparação)
    const idProduct = 1;
    const nome = 'Produto Teste';
    const qtdEstoque = 50;
    const unidMedida = 'peça';
    const preco = 29.99;
    const fornecedor = 'Fornecedor teste';
    const dtCreation = '2023-05-16';

    // Act (execução)
    const novoProduto = new Produto(idProduct, nome, qtdEstoque, unidMedida, preco, fornecedor, dtCreation);
    
    // Assert (verificação)
    expect(novoProduto.idProduct).toBe(idProduct);
    expect(novoProduto.nome).toBe(nome);
    expect(novoProduto.qtdEstoque).toBe(qtdEstoque);
    expect(novoProduto.unidMedida).toBe(unidMedida);
    expect(novoProduto.preco).toBe(preco);
    expect(novoProduto.fornecedor).toBe(fornecedor);
    expect(novoProduto.dtCreation).toBe(dtCreation);
  });
});

describe('Produto', () => {
  test('Produto com id vazio deve lançar uma exceção', () => {
    // Arrange (preparação)
    const idProduct = null;
    const nome = '';
    const qtdEstoque = 50;
    const unidMedida = 'peça';
    const preco = 29.99;
    const fornecedor = 'Fornecedor teste';
    const dtCreation = '2023-05-16';

    // Act (execução)
    const criarProduto = () => new Produto(idProduct, nome, qtdEstoque, unidMedida, preco, fornecedor, dtCreation);

    // Assert (verificação)
    expect(criarProduto).toThrowError('Código Inválido!');
  });
});

describe('Produto', () => {
  test('Produto com nome vazio deve lançar uma exceção', () => {
    // Arrange (preparação)
    const idProduct = 1;
    const nome = '';
    const qtdEstoque = 50;
    const unidMedida = 'peça';
    const preco = 29.99;
    const fornecedor = 'Fornecedor teste';
    const dtCreation = '2023-05-16';

    // Act (execução)
    const criarProduto = () => new Produto(idProduct, nome, qtdEstoque, unidMedida, preco, fornecedor, dtCreation);

    // Assert (verificação)
    expect(criarProduto).toThrowError('Nome Inválido!');
  });
});

describe('Produto', () => {
  test('Produto com quantidade vazio deve lançar uma exceção', () => {
    // Arrange (preparação)
    const idProduct = 1;
    const nome = 'Produto Teste';
    const qtdEstoque = null;
    const unidMedida = 'peça';
    const preco = 29.99;
    const fornecedor = 'Fornecedor teste';
    const dtCreation = '2023-05-16';

    // Act (execução)
    const criarProduto = () => new Produto(idProduct, nome, qtdEstoque, unidMedida, preco, fornecedor, dtCreation);

    // Assert (verificação)
    expect(criarProduto).toThrowError('Quantidade Inválida!');
  });
});

describe('Produto', () => {
  test('Produto com unidade de medida vazio deve lançar uma exceção', () => {
    // Arrange (preparação)
    const idProduct = 1;
    const nome = 'Produto Teste';
    const qtdEstoque = 50;
    const unidMedida = '';
    const preco = 29.99;
    const fornecedor = 'Fornecedor teste';
    const dtCreation = '2023-05-16';

    // Act (execução)
    const criarProduto = () => new Produto(idProduct, nome, qtdEstoque, unidMedida, preco, fornecedor, dtCreation);

    // Assert (verificação)
    expect(criarProduto).toThrowError('Unidade de medida Inválida!');
  });
});

describe('Produto', () => {
  test('Produto com preço vazio deve lançar uma exceção', () => {
    // Arrange (preparação)
    const idProduct = 1;
    const nome = 'Produto Teste';
    const qtdEstoque = 50;
    const unidMedida = 'peça';
    const preco = null;
    const fornecedor = 'Fornecedor teste';
    const dtCreation = '2023-05-16';

    // Act (execução)
    const criarProduto = () => new Produto(idProduct, nome, qtdEstoque, unidMedida, preco, fornecedor, dtCreation);

    // Assert (verificação)
    expect(criarProduto).toThrowError('Preço Inválido!');
  });
});

describe('Produto', () => {
  test('Produto com fornecedor vazio deve lançar uma exceção', () => {
    // Arrange (preparação)
    const idProduct = 1;
    const nome = 'Produto Teste';
    const qtdEstoque = 50;
    const unidMedida = 'peça';
    const preco = 50;
    const fornecedor = '';
    const dtCreation = '2023-05-16';

    // Act (execução)
    const criarProduto = () => new Produto(idProduct, nome, qtdEstoque, unidMedida, preco, fornecedor, dtCreation);

    // Assert (verificação)
    expect(criarProduto).toThrowError('Fornecedor Inválido!');
  });
});

describe('Produto', () => {
  test('Produto com data de cadastro vazio deve lançar uma exceção', () => {
    // Arrange (preparação)
    const idProduct = 1;
    const nome = 'Produto Teste';
    const qtdEstoque = 50;
    const unidMedida = 'peça';
    const preco = 50;
    const fornecedor = 'Fornecedor teste';
    const dtCreation = '';

    // Act (execução)
    const criarProduto = () => new Produto(idProduct, nome, qtdEstoque, unidMedida, preco, fornecedor, dtCreation);

    // Assert (verificação)
    expect(criarProduto).toThrowError('Data de criação Inválida!');
  });
});


