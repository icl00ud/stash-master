const _handler = require("../handlers/productHandler");
const express = require("express");
const router = express.Router();

router.get("/product", async (req, res) => {
  try {
    const products = await _handler.getAllProducts();
    return res.status(200).json(products[0]);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar os produtos" });
  }
});

router.get("/product/report", async (req, res) => {
  try {
    const items = await _handler.getProductReport();
    return res.status(200).json(items[0]);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar os produtos" });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const product = await _handler.getProductById(req.params.id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(404).json({ message: "Produto não encontrado!" });
  }
});

router.post("/product", (req, res) => {
  try {
    _handler.insertProduct(req.body);
    return res.status(201).json({ redirect: "/stock", message: "Produto criado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao criar o produto" });
  }
});

router.put("/product", async (req, res) => {
  try {
    await _handler.updateProduct(req.body);
    return res.status(200).json({ redirect: "/stock" });
  } catch (err) {
    return res.status(500).json({ redirect: "/stock", message: "Erro ao alterar o produto" });
  }
});

router.delete("/product", (req, res) => {
  try {
    _handler.deleteProduct(req.body);
    return res.status(200).json({ redirect: "/stock", message: "Produto excluído com sucesso" });
  } catch (err) {
    return res.status(404).json({ redirect: "/stock", message: "Erro ao deletar o produto" });
  }
});

module.exports = router;
