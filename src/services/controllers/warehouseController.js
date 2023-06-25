const _handler = require("../handlers/warehouseHandler.js");
const express = require("express");
const router = express.Router();

router.get("/warehouse/select", async (req, res) => {
    try {
      const items = await _handler.getWarehouseOptions();
      return res.status(200).json(items[0]);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

module.exports = router