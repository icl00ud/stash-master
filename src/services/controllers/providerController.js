const _handler = require("../handlers/providerHandler");
const express = require("express");
const router = express.Router();

router.get("/provider", async (req, res) => {
  try {
    const providers = await _handler.getAllProviders();
    return res.status(200).json(providers);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar os fornecedores" });
  }
});

router.get("/provider/:id", async (req, res) => {
  try {
    const providers = await _handler.getProviderById(req.params.id);
    return res.status(200).json(providers);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

router.post("/provider", (req, res) => {
  try {
    _handler.insertProvider(req.body);
    return res.status(201).json({ redirect: "/stock", message: "Fornecedor criado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/provider/autocomplete", async (req, res) => {
  try {
    const providers = await _handler.getAutoComplete(req.body.name);
    return res.status(200).json(providers);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.patch("/provider", (req, res) => {
  try {
    _handler.updateProvider(req.body);
    return res.status(200).json({ message: "Fornecedor alterado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/provider/:id", (req, res) => {
  try {
    _handler.deleteProviderById(req.params.id);
    return res.status(200).json({ redirect: "", message: "Fornecedor deletado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar um fornecedor" });
  }
});

module.exports = router;
