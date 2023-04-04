const _handler = require("../handlers/stockHandler");
const express = require("express");
const router = express.Router();
const path = require("path");

router.use(express.static(path.join(__dirname, "../../images")));

router.get("/stock", (req, res) => {
  router.use(express.static(path.join(__dirname, "../../pages/stock")));
  res.sendFile(path.join(__dirname, "../../pages/stock/stock.html"));
});

router.post("/stock", async (req, res) => {
});

module.exports = router;