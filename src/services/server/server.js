const express = require("express");
const app = express();

// Configuração do middleware do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/", require("../controllers/loginController"));
app.use("/", require("../controllers/signupController"));
app.use("/", require("../controllers/stockController"));
app.use("/", require("../controllers/modalController"));
app.use("/", require("../controllers/productController"));


app.listen(5050, () => {
  console.log("Servidor rodando na porta 5050");
});

module.exports = app;
