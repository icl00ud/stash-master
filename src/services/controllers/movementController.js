const _handler = require("../handlers/movementHandler");
const express = require("express");
const router = express.Router();

router.get("/movement", async (req, res) => {
  try {
    const movements = await _handler.getAllMovements();
    return res.status(200).json(movements[0]);
  } catch (err) {
    return res.status(500).json({ message: "Erro ao buscar as movimentações" });
  }
});

router.get("/movement/report", async (req, res) => {
  try {
    const result = await _handler.getMovReport();
    return res.status(200).json(result[0]);
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = router;
