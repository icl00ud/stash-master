const express = require("express");
const router = express.Router();
const path = require("path");
const _handler = require("../handlers/stockHandler");

router.use(express.static(path.join(__dirname, "../../images")));
router.use(express.static(path.join(__dirname, "../../components/modal/category/create-category")));
router.use(express.static(path.join(__dirname, "../../components/modal/movement/create-movement")));
router.use(express.static(path.join(__dirname, "../../components/modal/product/create-product")));
router.use(express.static(path.join(__dirname, "../../components/modal/product/delete-product")));
router.use(express.static(path.join(__dirname, "../../components/modal/product/update-product")));
router.use(express.static(path.join(__dirname, "../../common")));

router.get("/stockPage", (req, res) => {
  router.use(express.static(path.join(__dirname, "../../pages/stock")));
  res.sendFile(path.join(__dirname, "../../pages/stock/stock.html"));
});

router.get("/stock", async (req, res) => {
  try {
    const result = await _handler.getAllStocks();
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar os estoques" })
  }
});

router.get("/stock/report", async (req, res) => {
  try {
    const result = await _handler.getReport();
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
});

router.post("/stock", (req, res) => {
  try {
    _handler.insertStock(req.body);
    return res.status(201).json({ message: "Estoque criado com sucesso!" })
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar o estoque" })
  }
});

router.delete("/stock", (req, res) => {
});

module.exports = router;
