const _handler = require('../handlers/userHandler');
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/signup', (req, res) =>{
    router.use(express.static(path.join(__dirname, '../../pages/signup')));
    res.sendFile(path.join(__dirname, '../../pages/signup/signup.html'));
})

// Rota autenticação do usuário
router.post('/login', (req, res) => {
  // código para autenticação do usuário
});

// Rota cadastro do usuário
router.post('/signup', (req, res) => {
    try {
        const user = req.body;
        _handler.InsertUser(user);
        return res.status(200).json({ message: "Usuário inserido com sucesso!"});
    } catch (err) {
        console.error("Erro: ", err);
        return res.status(500).json({ message: "Erro ao inserir usuário." });
    }
});

module.exports = router;
