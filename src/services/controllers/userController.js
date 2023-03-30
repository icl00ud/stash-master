const _handler = require('../handlers/userHandler');
const express = require('express');
const router = express.Router();

// Rota autenticação do usuário
router.post('/login', (req, res) => {
    console.log("PDAKPDOSAKPDKOAS")
    const { username, password } = req.body;
});

// Rota cadastro do usuário
router.post('/signup', (res) => {
    try {
        _handler.InsertUser(user);
        return res.status(200).json({ message: "Usuário inserido com sucesso!"});
    } catch (err) {
        return console.error("Erro: ", err);
    }
});

module.exports = router;
