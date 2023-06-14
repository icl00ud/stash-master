const _handler = require("../handlers/unitHandler.js");
const express = require("express");
const router = express.Router();

router.get("/unit/select", async (req, res) => {
    try {
      const items = await _handler.getUnitOptions();
      return res.status(200).json(items[0]);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

module.exports = router