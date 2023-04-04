const express = require("express");
const app = express();
const path = require("path");

// Configuração do middleware do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../src/pages/signup/signup.css")));
app.use((req, res, next) => {
  if (req.path.substr(-1) === "/" && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

// Rota para lidar com as solicitações de login
app.use("/", require("../controllers/loginController"));

// Rota para lidar com as solicitações de registro
app.use("/", require("../controllers/signupController"));

// Rota para lidar com as solicitações de registro
app.use("/", require("../controllers/stockController"));

app.listen(5050, () => {
  console.log("Servidor rodando na porta 5050");
});

module.exports = app;
