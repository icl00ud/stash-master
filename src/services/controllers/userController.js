const _handler = require('../handlers/userHandler');
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/signup', (req, res) => {
    router.use(express.static(path.join(__dirname, '../../pages/signup')));
    res.sendFile(path.join(__dirname, '../../pages/signup/signup.html'));
});

router.get('/login', (req, res) => {
    router.use(express.static(path.join(__dirname, '../../pages/login')));
    res.sendFile(path.join(__dirname, '../../pages/login/login.html'));
});

router.post('/login', (req, res) => {
  // código para autenticação do usuário
});

router.post('/signup', (req, res) => {
    try {
        const user = req.body;
        _handler.InsertUser(user);
        return res.status(200).redirect('/login?account_created=true');
    } catch (err) {
        console.error("Erro: ", err);
        return res.status(500).redirect('/signup?account_created=false');
    }
});

module.exports = router;
