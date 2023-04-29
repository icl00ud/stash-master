const _handler = require("../handlers/loginHandler");
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
  console.log(authenticated)
  if (authenticated) {
    return res.status(200).json({ redirect: "stock" });
  } else {
    return res.status(401).json({ message: "Usuário e/ou senha inválido" });
  }
});

module.exports = router;
