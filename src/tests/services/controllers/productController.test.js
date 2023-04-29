const request = require("supertest");
const app = require("../../../services/server/server");
const productHandler = require("../../../services/handlers/productHandler");

describe("Product Route Tests", () => {
  test("should insert product into database", async () => {
    const product = {
      name: "Test Product",
      quantity: 10.0,
      unit: "pcs",
      price: 9.99,
      provider: "Test Provider",
    };

    const response = await request(app).post("/product").send(product).set("Accept", "application/json");
    const products = await request(app).get("/product");
    const productCreated = products.body[0].find((x) => x.nome === "Test Product");

    // assert
    expect(response.statusCode).toBe(201);
    expect(response.body.redirect).toBe("/stock");
    expect(response.body.message).toBe("Produto criado com sucesso!");
    expect(productCreated.nome).toBe(product.name);
    expect(productCreated.unidMedida).toBe(product.unit);
    expect(parseFloat(productCreated.preco)).toBe(product.price);
    expect(productCreated.fornecedor).toBe(product.provider);
  });

  it("should get all products", async () => {
    const spy = jest.spyOn(productHandler, "getAllProducts").mockImplementation(() => Promise.resolve([]));
    const res = await request(app).get("/product");

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("should get a product by id", async () => {
    const mockProduct = { id: "1", name: "test" };
    const spy = jest.spyOn(productHandler, "getProductById").mockImplementation(() => Promise.resolve(mockProduct));
    const res = await request(app).get("/product/1");

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(spy).toHaveBeenCalledWith("1");
    expect(res.body).toEqual(mockProduct);
    spy.mockRestore();
  });

  it("should update a product", async () => {
    const spy = jest.spyOn(productHandler, "updateProduct").mockImplementation(() => Promise.resolve());
    const res = await request(app).patch("/product").send({ id: "1", name: "product test2" });

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toEqual({ redirect: "/stock" });
    expect(spy).toHaveBeenCalledWith({ id: "1", name: "product test2" });
    spy.mockRestore();
  });

  it("should delete a product", async () => {
    const spy = jest.spyOn(productHandler, "deleteProduct").mockImplementation(() => Promise.resolve());
    const res = await request(app).delete("/product/1");

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toEqual({
      redirect: "/stock",
      message: "Produto excluído com sucesso",
    });
    expect(spy).toHaveBeenCalledWith("1");
    spy.mockRestore();
  });
});
