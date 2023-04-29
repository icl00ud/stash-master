const request = require("supertest");
const app = require("../../../services/server/server");

describe("Login routes", () => {
  test("GET /login returns status code 200 and login page HTML", async () => {
    const response = await request(app).get("/login");
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toContain("text/html");
  });

  test("POST /login with correct credentials returns status code 200 and redirect to /stock", async () => {
    const response = await request(app).post("/login").send({
        user: "admin",
        password: "adminadmin",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.redirect).toBe("stock");
  });

  test("POST /login with incorrect credentials returns status code 401 and error message", async () => {
    const response = await request(app).post("/login").send({
        user: "admin",
        password: "senhaerrada",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Usuário e/ou senha inválido");
  });
});