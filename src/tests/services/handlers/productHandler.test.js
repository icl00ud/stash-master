const request = require("supertest");
const app = require("../../../services/server/server"); // assuming this file exports your express app

describe("POST product", () => {
  it("should create a new product", async () => {
    const product = {
      name: "Produto teste",
      quantity: 1,
      unit: "Kg",
      price: 15.99,
      provider: "Fornecedor teste",
    };

    const response = await request(app).post("/product").send(product);

    expect(response.status).toBe(201);
  });
});

describe("GET /product", () => {
  it("should return all products", async () => {
    const response = await request(app).get("/product");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /product/:id", () => {
  it("should return a product by id", async () => {
    const productsResponse = await request(app).get("/product");
    const idProduct = productsResponse.body[0].find((x) => x.nome === "Produto teste").idProduct;

    const response = await request(app).get(`/product/${idProduct}`);

    expect(response.status).toBe(200);
    expect(response.body[0].idProduct).toEqual(idProduct);
  });
});

describe("PATCH /product/:id", () => {
  it("should update a product by id", async () => {
    const productsResponse = await request(app).get("/product");
    const productId = productsResponse.body[0].find(x => x.nome === "Produto teste").idProduct;

    const updatedProduct = {
      idProduct: productId,
      name: "Produto atualizado",
      quantity: 20,
      unit: "kg",
      price: 9.99,
      provider: "Fornecedor teste atualizado",
    };

    const response = await request(app).patch("/product").send(updatedProduct);

    expect(response.status).toBe(200);
  });
});

describe("DELETE /product/:id", () => {
  it("should delete a product by id", async () => {
    const productsResponse = await request(app).get("/product");
    const productId = productsResponse.body[0].find(x => x.nome === "Produto atualizado").idProduct;

    const response = await request(app).delete(`/product/${productId}`);
    const getProductResponse = await request(app).get(`/product/${productId}`);

    expect(response.status).toBe(200);
    expect(getProductResponse.statusCode).toBe(404);
  });
});
