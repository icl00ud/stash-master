const express = require('express');
const app = express();
const userController = require('../controllers/userController');
const path = require('path');

// Configuração do middleware do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../src/pages/signup/signup.css')));

// Rota para lidar com as solicitações relacionadas ao usuário
app.use('/', userController);

app.listen(5050, () => {
  console.log('Servidor rodando na porta 5050');
});

module.exports = app;