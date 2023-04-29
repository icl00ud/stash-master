const request = require("supertest");
const app = require("../../../services/server/server");

describe("Stock Route Tests", () => {
  it("deve retornar código 200 e tipo text/html da modal de create_product", async () => {
    const res = await request(app).get("/stock/create_product");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("text/html");
  });

  it("deve retornar código 200 e tipo text/html da modal de update_product", async () => {
    const res = await request(app).get("/stock/update_product");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("text/html");
  });

  it("deve retornar código 200 e tipo text/html da modal de delete_product", async () => {
    const res = await request(app).get("/stock/delete_product");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("text/html");
  });
});