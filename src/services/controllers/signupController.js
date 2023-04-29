const _handler = require("../handlers/signupHandler");
const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, "../../images")));

router.get("/signup", (req, res) => {
  router.use(express.static(path.join(__dirname, "../../pages/signup")));
  res.sendFile(path.join(__dirname, "../../pages/signup/signup.html"));
});

router.post("/signup", async (req, res) => {
  var response = await _handler.insertUser(req.body);
  console.log(response)
  if(response) {
    return res.status(200).json({ redirect: "/login?account_created=true" });
  } else {
    return res.status(500).json({ redirect: "/signup", message: "Erro ao criar a conta" });
  }
});

module.exports = router;