const express = require('express');
const app = express();
const userController = require('../controllers/userController');

// Configuração do middleware do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para lidar com as solicitações relacionadas ao usuário
app.use('/', userController);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
