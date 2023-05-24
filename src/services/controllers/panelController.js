const express = require("express");
const router = express.Router();
const path = require("path");
const _handler = require("../handlers/panelHandler");

router.use(express.static(path.join(__dirname, "../../images")));
router.use(express.static(path.join(__dirname, "../../components/modal")));

router.get("/panel", (req, res) => {
  router.use(express.static(path.join(__dirname, "../../pages/panel")));
  res.sendFile(path.join(__dirname, "../../pages/panel/panel.html"));
});

router.get("/user", async (req, res) => {
    try {
        const users = await _handler.getAllUsers();
        const message = "Usuários obtidos com sucesso.";
        return res.status(200).json({ users, message });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar os usuários" });
    }
});

router.patch("/user", async (req, res) => {
  try {
    await _handler.updateUser(req.body);
    return res.status(200).json({ message: "" });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao alterar o usuário" });
  }
});

router.delete("/user/:id", async (req, res) => {
    try {
        await _handler.deleteUserById(req.params.id);
        return res.status(200).json({ message: "Usuário deletado com sucesso" });
      } catch (err) {
        return res.status(500).json({ message: "Erro ao deletar o usuário" });
      }
}) 

module.exports = router;