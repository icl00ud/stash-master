const _handler = require("../handlers/userHandler");
const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, "../../images")));

router.get("/login", (req, res) => {
  router.use(express.static(path.join(__dirname, "../../pages/login")));
  res.sendFile(path.join(__dirname, "../../pages/login/login.html"));
});

router.post("/login", async (req, res) => {
  const authenticated = await _handler.authenticateUser(req.body);
  if (authenticated) {
    return res.status(200).json({ redirect: "entrei" });
  } else {
    return res.status(401).json({ redirect: "acesso negado" });
  }
});

router.get("/signup", (req, res) => {
  router.use(express.static(path.join(__dirname, "../../pages/signup")));
  res.sendFile(path.join(__dirname, "../../pages/signup/signup.html"));
});

router.post("/signup", (req, res) => {
  try {
    _handler.insertUser(req.body);
    return res.status(200).json({ redirect: "/login?account_created=true" });
  } catch (err) {
    console.error("Erro: ", err);
    return res.status(500).json({ redirect: "/signup?account_created=false" });
  }
});

module.exports = router;
