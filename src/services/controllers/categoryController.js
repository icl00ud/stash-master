const _handler = require("../handlers/categoryHandler");
const express = require("express");
const router = express.Router();

router.get("/category", async (req, res) => {
  try {
    const categories = await _handler.getAllCategories();
    return res.status(200).json(categories[0]);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar as categorias" });
  }
});

router.get("/category/report", async (req, res) => {
  try {
    const result = await _handler.getCategoryReport();
    return res.status(200).json(result[0]);
  } catch (err) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
