const request = require("supertest");
const app = require("../../../services/server/server");

describe("Stock Route Tests", () => {
  it("should serve create product modal", async () => {
    const res = await request(app).get("/stock/create_product");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("text/html");
  });

  it("should serve update product modal", async () => {
    const res = await request(app).get("/stock/update_product");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("text/html");
  });

  it("should serve delete product modal", async () => {
    const res = await request(app).get("/stock/delete_product");
    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("text/html");
  });
});